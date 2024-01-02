import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Superviser } from '../../common/interfaces/users.interface';
import { AssessmentCriteriaDto } from "./dto/assessment.dto";

@Injectable()
export class SuperviserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async find(email: string): Promise<any | undefined> {
      return await this.prismaService.superviser.findFirst({ where: { email: email }, include: {user: true} }) ;
    }
  
    async findAll(): Promise<any[]> {
      return await this.prismaService.superviser.findMany({include: {user: true}});
    }
  
    async findUnique(id: number): Promise<any> {
      return await this.prismaService.superviser.findUnique({ where: { id: id}, include: {user: true} });
    }
  
    async logout(userId: number): Promise<any> {
      await this.prismaService.superviser.update({
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
  
    async upsert(user: Partial<Superviser>): Promise<any> {
      return await this.prismaService.user.upsert({
        where: { id: user.id },
        create: {
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          hashedPassword: user?.hashedPassword,
          email: user.email,
          updatedAt: new Date().toISOString(),
          lastLoggedInTime: new Date().toISOString(),
          role: user.role,
          supervisor: {
            connect: {
              id: user.id
            },
          },
        },
        update: {
          lastLoggedInTime: new Date().toISOString(),
        },
      });
    }
    
    
    async create(user: Partial<Superviser>) {
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
      return await this.prismaService.user.findUnique({ where: { id }, include: {supervisor: true} });
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
      return await this.prismaService.user.findFirst({where: {email}, include: {supervisor: true}});
    }

    async AssessStudent(assessmentCriteriaDto: AssessmentCriteriaDto) {
      return await this.prismaService.superviserAssessment.create({
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