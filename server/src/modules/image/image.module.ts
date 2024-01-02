import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';
import { S3ManagerModule } from '../s3-manager/s3-manager.module';
import { StudentModule } from '../student/student.module';
import { SuperviserModule } from '../superviser/superviser.module';
import { CoordinatorModule } from '../coordinator/coordinator.module';
import { ApplicationModule } from '../application/application.module';
import { ApplicationService } from '../application/application.service';
import { ApplicationRepository } from '../application/application.repository';
import { PrismaService } from '../prisma/prisma.service';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Module({
  imports: [S3ManagerModule],
  providers: [ PrismaService, S3ManagerService, ImageRepository, ImageService],
  controllers: [ImageController],
})
export class ImageModule {}

