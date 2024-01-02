import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Coordinator, Department, DepartmentNames } from "@prisma/client";
import { CreateDto } from "./dto/department.dto";

@Injectable()
export class DepartmentRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAllDepartments(): Promise<Department[]> {
        return await this.prismaService.department.findMany({});
    }

    async findDepartment(departmentId: number): Promise<Department> {
        return await this.prismaService.department.findUnique({
            where: {
                id: departmentId
            }
        });
    }

    async findCoordinators(departmentId: number): Promise<any> {
        const res = await this.prismaService.department.findUnique({
            where: {
                id: departmentId
            },
            select: {
                   coordinator: {
                        include: {
                            user: true
                        }
                   }, // Include the superviser relation
                },
            });
            
        return res?.coordinator || [];
    }

    async createDepartment(createDepartmentDto: CreateDto): Promise<Department> {
        return await this.prismaService.department.create({
            data: {
                name: CreateDto.name as DepartmentNames,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(), 
            }
        });
    }

    async updateDepartment(updateDepartmentDto: Partial<Department>): Promise<Department> {
        return await this.prismaService.department.upsert({
            create: {
                name: CreateDto.name as DepartmentNames
            },
            update: {
                updatedAt: new Date().toISOString() 
            },
            where: {
                id: updateDepartmentDto.id
            }
        });
    }

    async deleteDepartment(departmentId: number): Promise<boolean>  {
        const res = await this.prismaService.department.delete({
            where: {
                id:departmentId
            }
        });
        if (res) {
            return true;
        }
        else 
            return false;
    }
}