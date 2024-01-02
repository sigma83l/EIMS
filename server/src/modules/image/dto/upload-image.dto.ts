import { IsEnum, IsString } from "class-validator";
import { ImageType } from './image-type.enum';

export class UploadImageDto {
    @IsEnum(ImageType, {each: true})
    type: ImageType;
}