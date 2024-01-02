import { Module } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';
import { CoordinatorRepository } from './coordinator.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from '../image/image.service';
import { ImageRepository } from '../image/image.repository';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Module({
  providers: [CoordinatorService, CoordinatorRepository, PrismaService, ImageService, ImageRepository, S3ManagerService],
  controllers: [CoordinatorController]
})
export class CoordinatorModule {}
