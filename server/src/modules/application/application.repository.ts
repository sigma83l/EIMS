import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createApplicationDto } from './dto/application.dto';
import { File } from '../../common/interfaces/file.interface';
import { Application, Resume } from '@prisma/client';

@Injectable()
export class ApplicationRepository {
    constructor(private readonly prismaService: PrismaService) {}
    
    async findApplicationsByStudentId(studentId: number){
        return await this.prismaService.application.findMany({
            where: {
                student: {
                    id: studentId
                }
            },
            include: {
                insurance: true,
                resume: true,
                student:true,
            }
        });
    }

    async findApplicationsByCoordinatorId(coordinatorId: number): Promise<Application[]>{
        return await this.prismaService.application.findMany({
            where: {
                student: {
                    department: {
                        coordinator: {
                            id:coordinatorId
                        }
                    }
                }
            },
            include: {
                insurance: true,
                resume: true,
                student:true,
            },
        });
    }

    async findApplicationById(applicationId: number){
        return await this.prismaService.application.findUnique({
            where: { id: applicationId },
            include: {
                resume: true,
                insurance: true,
            }
        });
    }

    async createApplication(email: string, createDto: createApplicationDto, resumeName: string, insuranceKey?: string, insuranceFileData?: File) {
        const user = await this.prismaService.user.findUnique({where: {email: email}, include:{student:true}});
        return await this.prismaService.application.create({
            data: {
                days: createDto.days,
                name: createDto.name,
                email: email,
                student: {
                    connect: {
                      id: user.id
                    },
                  },
                insurance: {
                    create: {
                        name: insuranceKey,
                        size: insuranceFileData.size,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                },
                cyprus: insuranceKey?true:false,
                resume: {
                    create: {
                        name: resumeName,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        isVerified: false,
                        
                    }
                }

            }
        });
    }

    async declineApplication(applicationId: number) {
        return await this.prismaService.application.update({
            data: {
                isApproved: false
            },
            where: {
                id: applicationId
            }
        });
    }

    async approveApplication(applicationId: number) {
        return await this.prismaService.application.update({
            data: {
                isApproved: true
            },
            where: {
                id: applicationId
            }
        });
    }

    async deleteApplication(applicationId: number) {
        return await this.prismaService.application.delete({
            where: {
                id: applicationId
            }
        });
    }
}