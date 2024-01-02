import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentRepository } from './department.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DepartmentService, DepartmentRepository, PrismaService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
