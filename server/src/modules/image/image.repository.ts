import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Application, Image as FileModel, Image } from '@prisma/client';
import { ImageType } from './dto/image-type.enum';



@Injectable()
export class ImageRepository {

  constructor(private readonly prisma: PrismaService) {}

  async saveFile(
    subId: number,
    fileName: string,
    type: ImageType,
    size: number,
  ): Promise<FileModel> {
  if (type===ImageType.APPLICATION){
    return await this.prisma.image.create({
      data: {
        name:fileName,
        size: size,      
        application: {connect: {id: subId}},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }
  else {
    return this.prisma.image.create({
      data: {
        name:fileName,
        size: size,
        user: {connect: {id:subId}},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    });
  }
  }

  async findById(id: number): Promise<FileModel> {
    return this.prisma.image.findUnique({ where: { id: id } });
  }

  async findByUrl(name: string) { 
    return await this.prisma.image.findFirst({ where: { name } });
  }

  async update(
    id: number,
    updateFileDto: UpdateImageDto,
  ): Promise<FileModel | undefined> {
    return this.prisma.image.update({
      where: { id },
      data: {
        name: updateFileDto.name,
        updatedAt: new Date().toISOString(),
      },
    });
  }
  async findUnverifieds(): Promise<FileModel[]> {
    return this.prisma.image.findMany({
      where: { isVerified: false },
      include: { application: { include: { student: true } } },
    });
  }

  async accept(id: number): Promise<FileModel> {
    return this.prisma.image.update({
      where: { id: id },
      data: {
        isVerified: true,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async delete(id: number): Promise<FileModel> {
    return this.prisma.image.delete({ where: { id: id } });
  }

  async findByApplicationId(applicationId: number): Promise<Image> {
    return await this.prisma.image.findFirst({
      where: {applicationId: applicationId},
    })
  }
}

