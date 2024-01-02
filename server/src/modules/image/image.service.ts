import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
// import { SubjectService } from '../subject/subject.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { ImageRepository } from './image.repository';
import { File } from '../../common/interfaces/file.interface';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { Application, Image as FileModel, Image } from '@prisma/client';
import * as mime from 'mime-types';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApplicationService } from '../application/application.service';
import { ImageType } from './dto/image-type.enum';


@Injectable()
export class ImageService {
    constructor(
      private readonly fileRepository: ImageRepository,
      private readonly s3: S3ManagerService,
    ) {}
    async saveFile(subId: number, type:ImageType, file: File) {

  
      if (!this.isValidType(file.mimetype))
        throw new HttpException(
          "file type is not valid",
          HttpStatus.FORBIDDEN,
        );
  
      const size = Math.round(file.size / 1000);
  
      const saveToStorage = await this.s3.uploadFile('images', file);
  
      await this.fileRepository.saveFile(
        subId,
        saveToStorage.key,
        type,
        size,
      );
  
      return { success: true };
    }
  
    async deleteFile(id: number) {
      const file = await this.fileRepository.findById(id);
  
      if (!file) throw new BadRequestException("file not found");
  
      await this.s3.deleteFile('images', file.name);
      await this.fileRepository.delete(id);
  
      return { sucess: true };
    }
  
    async update(
      id: number,
      updateFileDto: UpdateImageDto,
    ): Promise<any> {
      const file = await this.fileRepository.findById(id);
      if (!file) {
        throw new BadRequestException("file not found");
      }
      await this.fileRepository.update(id, updateFileDto);
      return { success: true };
    }
    async findUnverifieds(): Promise<FileModel[]> {
      const files = await this.fileRepository.findUnverifieds();
      return files;
    }
  
    async accept(id: number): Promise<FileModel> {
      const file = await this.fileRepository.findById(id);
  
      if (!file)
        throw new HttpException(
          "file not found",
          HttpStatus.NOT_FOUND,
        );
  
      return await this.fileRepository.accept(id);
    }
  
    isValidType(mimeType: string): boolean {
      const allowedFileExtensions = [
        'pdf',
      ];
      const fileExt = `${mime.extension(mimeType)}`;
  
      if (allowedFileExtensions.includes(fileExt)) {
        return true;
      }
  
      return false;
    }
    async findByIdOrThrowExpection(
      fileId: number,
    ): Promise<any | undefined> {
      const fileData = await this.fileRepository.findById(fileId);
      if (!fileData || !fileData.isVerified) {
        throw new BadRequestException("file not found");
      }
      const file = await this.s3.getFile("images", fileData.name);

      return {
        ...fileData,
        file: file.Body as Buffer 
      };
    }
    async findByApplicationId(applicationId: number): Promise<Image> {
      return await this.fileRepository.findByApplicationId(applicationId);
    }
  
  }
