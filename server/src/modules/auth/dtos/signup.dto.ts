import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { CustomMatchPasswords } from 'src/common/utils/password.util';
import { UserType } from '../types';

export class VerificationDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsEnum(UserType)
  userType: UserType;
}

abstract class UserSignUpDto {
  @IsEnum(UserType)
  userType: UserType;

  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000, { message: "otp shouldn't be less then 4 numbers" })
  @Max(9999, { message: "otp shouldn't be more then 4 numbers" })
  otp?: number;
  
  @IsPhoneNumber()
  phone?: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'password is too short' })
  @MaxLength(50, { message: 'password is too long' })
  password: string;

  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirm: string;
}

export class StudentSignUpDto extends UserSignUpDto{
  @IsNotEmpty()
  @IsNumber()
  @Min(10000000, { message: "student number shouldn't be less then 8 numbers" })
  @Max(99999999, { message: "student number shouldn't be more then 8 numbers" })
  studentNumber: number;
}

export class CoordinatorSignUpDto extends UserSignUpDto {
  
  @IsNumber()
  departmentId: number=0;
}

export class SuperviserSignUpDto extends UserSignUpDto {
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNumber()
  companyId: number=0;
}
