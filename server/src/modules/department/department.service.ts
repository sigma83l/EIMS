import { Injectable } from '@nestjs/common';
import { Coordinator, Department } from '@prisma/client';
import { DepartmentRepository } from './department.repository';
import { CreateDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
    constructor(private readonly departmentRepository: DepartmentRepository) {}

    async findAllDepartments(): Promise<Department[]> {
        return await this.departmentRepository.findAllDepartments();
    }

    async findDepartment(departmentId: number): Promise<Department> {
        return await this.departmentRepository.findDepartment(departmentId);
    }

    async findCoordinators(departmentId: number): Promise<Coordinator[]> {
        return await this.departmentRepository.findCoordinators(departmentId);
    }

    async createDepartment(createdepartmentDto: CreateDto): Promise<Department> {
        return await this.departmentRepository.createDepartment(createdepartmentDto);
    }

    async updateDepartment(updatedepartmentDto: Partial<Department>): Promise<Department> {
        return await this.departmentRepository.updateDepartment(updatedepartmentDto);
    }

    async deleteDepartment(departmentId: number): Promise<boolean>  {
        return await this.departmentRepository.deleteDepartment(departmentId);
    }
}
