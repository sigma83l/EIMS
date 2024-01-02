import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from '../image/image.service';
import { ImageRepository } from '../image/image.repository';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentRepository, PrismaService, ImageService, ImageRepository, S3ManagerService]
})
export class StudentModule {}
