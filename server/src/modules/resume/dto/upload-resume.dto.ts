import { IsString } from "class-validator";

export class UploadResumeDto {
    @IsString()
    name: string;
}