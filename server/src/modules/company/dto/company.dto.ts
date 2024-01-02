import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsEmail, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Fields } from '../../../common/enums/working-fileds.enum'; // Assuming WorkingFields is the correct enum
import { WorkingFields } from '@prisma/client';

export class CreateDto {

  @IsEnum(Fields, { each: true })
  workingFields: WorkingFields[];

  @IsInt()
  @IsNotEmpty()
  postalAddr: number;

  @IsOptional()
  @IsInt()
  fax?: number;

  @IsPhoneNumber()
  telephoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  webAddr: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @MaxLength(150, { message: "Description is too long" })
  description: string;
}
