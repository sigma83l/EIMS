import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './application.repository';
import { PrismaService } from '../prisma/prisma.service';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { ResumeService } from '../resume/resume.service';
import { ImageService } from '../image/image.service';
import { S3ManagerModule } from '../s3-manager/s3-manager.module';
import { ImageModule } from '../image/image.module';
import { ImageRepository } from '../image/image.repository';
import { ResumeRepository } from '../resume/resume.repository';

@Module({
  imports: [S3ManagerModule],
  controllers: [ApplicationController],
  providers: [PrismaService, ImageService, ImageRepository, S3ManagerService, ApplicationService, ApplicationRepository, ResumeService, ResumeRepository],
})
export class ApplicationModule {}
 