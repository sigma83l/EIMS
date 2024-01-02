import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { StudentRepository } from '../student/student.repository';
import { Hash } from '../../common/utils/hash.util';
// import { User } from '@prisma/client';
import { JwtPayload, Tokens, UserType } from './types';
import { JwtService } from '@nestjs/jwt';
import { 
  SuperviserSignUpDto, 
  CoordinatorSignUpDto, 
  StudentSignUpDto, 
  VerificationDto 
} from './dtos/signup.dto';
import { AuthRepository } from './auth.repository';
import { OtpService } from './otp.service';
import { MailService } from '../mail/mail.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { CoordinatorRepository } from '../coordinator/coordinator.repository';
import { SuperviserRepository } from '../superviser/superviser.repository';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly coordinatorRepository: CoordinatorRepository,
    private readonly superviserRepository: SuperviserRepository,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly otp: OtpService,
    private readonly mailService: MailService,
    private readonly s3: S3ManagerService,
  ) {}

  async login(loginUser: LoginDto) {
    
    const student = await this.studentRepository.find(loginUser.email);
    const coordinator = await this.coordinatorRepository.find(loginUser.email);
    const superviser = await this.superviserRepository.find(loginUser.email);
    let userType;

    if (student){
      userType = UserType.Student;
    }
    else if (coordinator){
      userType = UserType.Student;
    }
    else if (superviser){
      userType = UserType.Superviser;
    }
    else {
      throw new BadRequestException('invalid user type');
    }
    if (!student && !coordinator && !superviser) {
      throw new BadRequestException('email does not exist');
    }
    const user = (student || coordinator || superviser); 
    const isPasswordValid = await Hash.compare(
      loginUser.password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('credentials invalid');
    }
    const userData = {
      sub: user.id,
      role: user.role,
      email: user.email,
      userType: userType,
    } 
    
    return await this.getTokens(userData);
  }

  async getTokens(payload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.SECRET_KEY;
    const accessTokenOptions = { expiresIn: '15m' };
    const refreshTokenOptions = { expiresIn: '7d' };

    const accessToken = await this.signToken(
      payload,
      secretKey,
      accessTokenOptions,
    );
    const refreshToken = await this.signToken(
      payload,
      secretKey,
      refreshTokenOptions,
    );
    await this.updateRefreshTokenHash(payload.sub, refreshToken);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }


  async signToken(
    payload: JwtPayload,
    secretKey: string,
    options: any,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

  async logout(userId: number): Promise<boolean> {
    return await this.studentRepository.logout(userId);
  }

  async updateRefreshTokenHash(
    sub: number,
    refresh_token: string,
  ): Promise<void> {
    const hashedRefreshToken: string = await Hash.hash(refresh_token);

    await this.studentRepository.updateRefreshTokenHash(sub, hashedRefreshToken);
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const student = await this.studentRepository.findById(userId);
    const coordinator = await this.coordinatorRepository.findById(userId);
    const superviser = await this.superviserRepository.findById(userId);

    let user;
    let userType: UserType;
    if (student) {
      user = student;
      userType = UserType.Student;
    } 
    else if (coordinator) {
      user = coordinator;
      userType = UserType.Coordinator;
    }
    else if (superviser) {
      user = superviser;
      userType = UserType.Superviser;
    }
    else {
      throw new BadRequestException('Invalid user type');
    }
    if (!user || !user.hashedRT) throw new ForbiddenException('Access Denied');

    const rtMatches = await Hash.compare(refreshToken, user.hashedRT);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    return await this.getTokens({
      sub: user.id,
      role: user.role,
      email: user.email,
      userType: userType
    });
  }

  async sendCode(verificationDto: VerificationDto) {
    await this.validateEmailForSignUp(verificationDto.userType, verificationDto.email);
    const varification = await this.authRepository.findVerification(
      verificationDto.email,
    );

    if (
      varification &&
      this.otp.requestesALot(varification.try, varification.lastResendTime)
    ) {
      throw new BadRequestException('you have requested a lot');
    }

    const otp = this.otp.generate().toString();
    const hashedOtp = await Hash.hash(otp);

    await this.authRepository.upsertVarification(verificationDto, hashedOtp);
    await this.mailService.sendOtp(+otp, verificationDto.email);

    return { success: true };
  }

  async updatePassword(password: string, id: number, token: string) {
    const student = await this.studentRepository.findById(id);
    const coordinator = await this.coordinatorRepository.findById(id);
    const superviser = await this.superviserRepository.findById(id);

    let user;
    let userType: UserType;
    if (student) {
      user = student;
      userType = UserType.Student;
    } 
    else if (coordinator) {
      user = coordinator;
      userType = UserType.Coordinator;
    }
    else if (superviser) {
      user = superviser;
      userType = UserType.Superviser;
    }
    else {
      throw new BadRequestException('Invalid user type');
    }
    
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const secret = process.env.SECRET_KEY + user.hashedPassword;

    try {
      await this.jwtService.verify(token, { secret: secret });
      const hashedPassword = await Hash.hash(password);

      if (userType == UserType.Student) {
        await this.studentRepository.updatePassword(id, hashedPassword);
      }
      else if (userType == UserType.Coordinator) {
        await this.coordinatorRepository.updatePassword(id, hashedPassword);
      }
      else {
        await this.superviserRepository.updatePassword(id, hashedPassword);
      }

      return { success: true };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new BadRequestException(
          'Invalid token or password update failed',
        );
      }
    }
  }

  async validateResetPasswordToken(id: number, token: string) {
    const student = await this.studentRepository.findById(id);
    const coordinator = await this.coordinatorRepository.findById(id);
    const superviser = await this.superviserRepository.findById(id);

    let user;
    let userType: UserType;
    if (student) {
      user = student;
      userType = UserType.Student;
    } 
    else if (coordinator) {
      user = coordinator;
      userType = UserType.Coordinator;
    }
    else if (superviser) {
      user = superviser;
      userType = UserType.Superviser;
    }
    else {
      throw new BadRequestException('Invalid user type');
    }
    
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const secret = process.env.SECRET_KEY + user.hashedPassword;

    try {
      await this.jwtService.verify(token, { secret: secret });
      return { sucess: true };
    } catch (error) {
      return { message: 'some thing is manipulated Or link is expired...' };
    }
  }

  async validateEmailForSignUp(userType: UserType, email: string): Promise<boolean | undefined> {
    let user;
    if (userType === UserType.Student) {
      user = await this.studentRepository.find(email);
    } 
    else if (userType === UserType.Coordinator) {
      user = await this.coordinatorRepository.find(email);
    }
    else if (userType === UserType.Superviser) {
      user = await this.superviserRepository.find(email);
    }
    else {
      throw new BadRequestException('Invalid user type');
    }

    if (user) {
      throw new HttpException('email already exists', 400);
    }
    return true;
  }

  async generateUniqueLink(email: string) {

    const student = await this.studentRepository.find(email);
    const coordinator = await this.coordinatorRepository.find(email);
    const superviser = await this.superviserRepository.find(email);

    let user;
    let userType: UserType;
    if (student) {
      user = student;
      userType = UserType.Student;
    } 
    else if (coordinator) {
      user = coordinator;
      userType = UserType.Coordinator;
    }
    else if (superviser) {
      user = superviser;
      userType = UserType.Superviser;
    }
    else {
      throw new BadRequestException('Invalid user type');
    }
    
    if (!user) {
      throw new BadRequestException('user not found');
    }

    if(!user) {
      throw new BadRequestException('user not found');
    }
    const jwtPayload: JwtPayload = {
        sub: user.id,
        role: user.role,
        email: user.email,
        userType: userType
      };
    const secret = process.env.SECRET_KEY + user.hashedPassword;
      

    const token = await this.jwtService.sign(jwtPayload, {
      secret: secret,
      expiresIn: '15m',
    });
    const link = `https://eims.emu.edu.tr/new-password/${user.id}/${token}`;
    await this.mailService.forgetPassword(link, email);

    return { sucess: true };
  }
  
  async validateVerifications(
    email: string,
    otp: number,
  ): Promise<boolean | undefined> {
    const verification = await this.authRepository.findVerification(email);
    if (!verification) {
      throw new BadRequestException('not found');
    }
    await this.otp.validate(otp, verification);

    return true;
  }

  async signUp(signUPDto: SuperviserSignUpDto | CoordinatorSignUpDto | StudentSignUpDto): Promise<Tokens> {
    const isEmailVerified = await this.validateVerifications(signUPDto.email, signUPDto.otp);
    if (!isEmailVerified) {
       throw new UnauthorizedException('email is not verified')
    } 
    const res = await this.validateEmailForSignUp(signUPDto.userType, signUPDto.email);
    if (!res) throw new UnauthorizedException('Email is not validated yet');
    const hashedPassword = await Hash.hash(signUPDto.password);
    
    let user;
    let userType: UserType;
    
    if (signUPDto.userType == UserType.Student) {
      const studentSignUpDto = signUPDto as StudentSignUpDto;
      user = await this.studentRepository.create({
        email: studentSignUpDto.email,
        phone: studentSignUpDto.phone,
        studentNo: studentSignUpDto.studentNumber,
        firstname: studentSignUpDto.firstname,
        lastname: studentSignUpDto.lastname,
        hashedPassword: hashedPassword,
        // role: signUPDto.role,
      });
      userType = UserType.Student;
    }
    else if (signUPDto.userType == UserType.Coordinator) {
      const coordinatorSignUpDto = signUPDto as CoordinatorSignUpDto;
      user = await this.coordinatorRepository.create({
        email: coordinatorSignUpDto.email,
        phone: coordinatorSignUpDto.phone,
        departmentId: coordinatorSignUpDto.departmentId,
        firstname: coordinatorSignUpDto.firstname,
        lastname: coordinatorSignUpDto.lastname,
        hashedPassword: hashedPassword,
      });
      userType = UserType.Coordinator;
    }
    else {
      const superviserSignUpDto = signUPDto as SuperviserSignUpDto;
      user = await this.superviserRepository.create({
        email: superviserSignUpDto.email,
        phone: superviserSignUpDto.phone,
        position: superviserSignUpDto.position,
        companyId: superviserSignUpDto.companyId,
        firstname: superviserSignUpDto.firstname,
        lastname: superviserSignUpDto.lastname,
        hashedPassword: hashedPassword,
      });
      userType = UserType.Superviser;
    }
    
    // await this.s3.uploadFile("images", file);

    return await this.getTokens({
      sub: user.id,
      role: user.role,
      email: user.email,
      userType: userType
    });
  }
  async signUpCoordinator(signUPDto: CoordinatorSignUpDto): Promise<Tokens> {
    const isEmailVerified = await this.validateVerifications(signUPDto.email, signUPDto.otp);
    if (!isEmailVerified) {
       throw new UnauthorizedException('email is not verified')
    } 
    const res = await this.validateEmailForSignUp(signUPDto.userType, signUPDto.email);
    if (!res) throw new UnauthorizedException('Email is not validated yet');

    const hashedPassword = await Hash.hash(signUPDto.password);
    
    
    const studentSignUpDto = signUPDto as CoordinatorSignUpDto;
    const user = await this.coordinatorRepository.create({
        email: studentSignUpDto.email,
        phone: studentSignUpDto.phone,
        departmentId: studentSignUpDto.departmentId,
        firstname: studentSignUpDto.firstname,
        lastname: studentSignUpDto.lastname,
        hashedPassword: hashedPassword,
    });

    // await this.s3.uploadFile("images", file);

    return await this.getTokens({
      sub: user.id,
      role: user.role,
      email: user.email,
      userType: UserType.Coordinator
    });
  }
}
