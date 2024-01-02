import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Coordinator } from '../../common/interfaces/users.interface';
import { Department } from '@prisma/client';
import { AssessmentCriteriaDto } from './dto/assessment.dto';

@Injectable()
export class CoordinatorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDepartments() {

  }

  async find(email: string): Promise<any | undefined> {
    return await this.prismaService.coordinator.findFirst({ where: { email: email }, include: {user: true} }) ;
  }

  async findAll(): Promise<any[] | undefined> {
    return await this.prismaService.coordinator.findMany({include: {user: true}});
  }

  async findUnique(id: number): Promise<any> {
    return await this.prismaService.coordinator.findUnique({ where: { id: id}, include: {user: true} });
  }

  async logout(userId: number): Promise<any> {
    await this.prismaService.coordinator.update({
      where: {
        id: userId,
      },
      data: {
        user: {
            update: {
              hashedRT: null,
            },
        },
      },
    });
    return true;
  }
  async updateRefreshTokenHash(
    userId: number,
    hashedRT: string,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRT,
      },
    });
  }

  async upsert(user: Partial<Coordinator>): Promise<any> {
    return await this.prismaService.user.upsert({
      create: {
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        hashedPassword: user?.hashedPassword,
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoggedInTime: new Date().toISOString(),
        role: user.role,
        image: {
          create: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: ""
          }
        },
        coordinator: {
            create: {
                department: {
                  connect: {
                    id: user.departmentId,
                  }
                },
                email: user.email,
            }
        }
      },
      update: {
        lastLoggedInTime: new Date().toISOString(),
      },
      where: { id: user.id },
    });
  }
  async create(user: Partial<Coordinator>) {
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        updatedAt: new Date().toISOString(),
        lastLoggedInTime: new Date().toISOString(),
        hashedPassword: user?.hashedPassword,
        role: user.role,
      },
    });
  }
  async findById(id: number): Promise<any> {
    return await this.prismaService.user.findUnique({ where: { id }, include: {coordinator: true} });
  }

  async updatePassword(id: number, hashedPassword: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        hashedPassword: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findFirst({where: {email}, include: {coordinator:true}});
  }

  async AssessStudent(assessmentCriteriaDto: AssessmentCriteriaDto) {
    return await this.prismaService.coordinatorAssessment.create({
        data: {
          experienceGained: assessmentCriteriaDto.experienceGained,
          overalAssessmentResult: assessmentCriteriaDto.overalAssessmentResult,
          presentation: assessmentCriteriaDto.presentation,
          qualityOfStudentInternshipReport: assessmentCriteriaDto.qualityOfStudentInternshipReport,
          visualPresentationAid: assessmentCriteriaDto.visualPresentationAid,
          studentId: assessmentCriteriaDto.studentId
        },
    });
  }
}
