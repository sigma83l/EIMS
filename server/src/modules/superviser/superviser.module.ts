import { Module } from '@nestjs/common';
import { SuperviserService } from './superviser.service';
import { SuperviserController } from './superviser.controller';
import { SuperviserRepository } from './superviser.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from '../image/image.service';
import { ImageRepository } from '../image/image.repository';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Module({
  providers: [SuperviserService, SuperviserRepository, PrismaService, ImageService, ImageRepository, S3ManagerService],
  controllers: [SuperviserController]
})
export class SuperviserModule {}
