import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsEmail, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Department } from '../../../common/enums/department.enum'; // Assuming WorkingFields is the correct enum
import { DepartmentNames } from '@prisma/client';

export class CreateDto {
  @IsString()
  @IsEnum(Department, {each: true})
  name: DepartmentNames;

}
