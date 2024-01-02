import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsEmail, MaxLength, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { Fields } from '../../../common/enums/working-fileds.enum'; // Assuming WorkingFields is the correct enum
import { WorkingFields } from '@prisma/client';


    // studentId             Int                     @unique
    // resumeId              Int                     @unique
    // name                  String
    // days                  Int
    // insurance             Image?
    // isVerified            Boolean                 @default(false)
    // resume                Resume                  @relation(fields: [resumeId], references: [id])
    // student               Student                 @relation(fields:[studentId], references:[id])

export class createApplicationDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsInt()
  @IsEnum([20,40])
  days: number;

  @IsNotEmpty()
  @IsString()
  resume: string;
}
