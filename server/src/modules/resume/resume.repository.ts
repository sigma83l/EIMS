import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadResumeDto } from './dto/upload-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume as FileModel } from '@prisma/client';

@Injectable()
export class ResumeRepository {

  constructor(private readonly prisma: PrismaService) {}

  async saveFile(
    applicationId: number,
    fileName: string,
    type: string,
    size: number,
    uploadFileDto: UploadResumeDto,
  ): Promise<FileModel> {
    return this.prisma.resume.create({
      data: {
        name:uploadFileDto.name,
        size: size,
        application: { connect: { id: applicationId } },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async findById(id: number): Promise<FileModel> {
    return this.prisma.resume.findUnique({ where: { id: id } });
  }

  async findByUrl(name: string) {
    return await this.prisma.resume.findFirst({ where: { name } });
  }

  async update(
    id: number,
    updateFileDto: UpdateResumeDto,
  ): Promise<FileModel | undefined> {
    return this.prisma.resume.update({
      where: { id },
      data: {
        name: updateFileDto.name,
        updatedAt: new Date().toISOString(),
      },
    });
  }
  async findUnverifieds(): Promise<FileModel[]> {
    return this.prisma.resume.findMany({
      where: { isVerified: false },
      include: { application: { include: { student: true } } },
    });
  }

  async accept(id: number): Promise<FileModel> {
    return this.prisma.resume.update({
      where: { id: id },
      data: {
        isVerified: true,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async delete(id: number): Promise<FileModel> {
    return this.prisma.resume.delete({ where: { id: id } });
  }
}
