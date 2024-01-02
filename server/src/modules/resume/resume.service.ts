import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
// import { SubjectService } from '../subject/subject.service';
import { UploadResumeDto } from './dto/upload-resume.dto';
import { ResumeRepository } from './resume.repository';
import { File } from '../../common/interfaces/file.interface';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { Resume as FileModel } from '@prisma/client';
import * as mime from 'mime-types';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class ResumeService {
    constructor(
      private readonly fileRepository: ResumeRepository,
      private readonly s3: S3ManagerService,
    ) {}
    async saveFile(applicationId: number, file: File, uploadFileDto: UploadResumeDto) {
  
      if (!this.isValidType(file.mimetype))
        throw new HttpException(
          "file type is not valid",
          HttpStatus.FORBIDDEN,
        );
  
      const size = Math.round(file.size / 1000);
      const fileType = `${mime.extension(file.mimetype)}`;
  
      const saveToStorage = await this.s3.uploadFile('resumes', file);
  
      await this.fileRepository.saveFile(
        applicationId,
        saveToStorage.key,
        fileType,
        size,
        uploadFileDto,
      );
  
      return { success: true };
    }
  
    async deleteFile(id: number) {
      const file = await this.fileRepository.findById(id);
  
      if (!file) throw new BadRequestException("file not found");
  
      await this.s3.deleteFile('resumes', file.name);
      await this.fileRepository.delete(id);
  
      return { sucess: true };
    }
  
    async update(
      id: number,
      updateFileDto: UpdateResumeDto,
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
      const file = await this.s3.getFile("resumes", fileData.name);

      return {
        ...fileData,
        file: file.Body as Buffer,
      };
    }
  
  }