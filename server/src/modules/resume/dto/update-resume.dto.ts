import { IsString } from "class-validator";

export class UpdateResumeDto {
    @IsString()
    name: string;
}