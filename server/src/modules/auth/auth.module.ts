import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/at.strategy';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { StudentRepository } from '../student/student.repository';
import { MailService } from '../mail/mail.service';
import { OtpService } from './otp.service';
import { AuthRepository } from './auth.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailModule } from '../mail/mail.module';
import { CoordinatorRepository } from '../coordinator/coordinator.repository';
import { SuperviserRepository } from '../superviser/superviser.repository';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET_KEY }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository,
    JwtStrategy, 
    RefreshTokenStrategy, 
    StudentRepository, 
    CoordinatorRepository,
    SuperviserRepository,
    MailService,
    OtpService,
    JwtService,
    PrismaService,
    S3ManagerService
  ],
  exports: [StudentRepository, PrismaService],
})
export class AuthModule {}
