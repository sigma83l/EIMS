import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { StudentRepository } from '../student/student.repository';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
