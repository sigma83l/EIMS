import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Student } from '../../common/interfaces/users.interface';

@Injectable()
export class StudentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(email: string): Promise<any | undefined> {
    return await this.prismaService.student.findFirst({ where: { email: email }, include: {user: true} }) ;
  }

  async findAll(): Promise<any[]> {
    return await this.prismaService.student.findMany({include: {user: true}});
  }

  async findUnique(id: number): Promise<any> {
    return await this.prismaService.student.findUnique({ where: { id: id}, include: {user: true} });
  }

  async logout(userId: number): Promise<any> {
    await this.prismaService.student.update({
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

  async upsert(user: Partial<Student>): Promise<any> {
    return await this.prismaService.user.upsert({
      create: {
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        hashedPassword: user?.hashedPassword,
        email: user.email,
        updatedAt: new Date().toISOString(),
        lastLoggedInTime: new Date().toISOString(),
        role: user.role,
        student: {
            create: {
                studentNumber: user.studentNo,
                email: user.email,
                department: {
                  connect: {
                    id: user.departmentId
                  }
                }
            }
        }
      },
      update: {
        lastLoggedInTime: new Date().toISOString(),
      },
      where: { id: user.id },
    });
  }
  async create(user: Partial<Student>): Promise<any> {
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
    return await this.prismaService.user.findUnique({ where: { id }, include: {student: true} });
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
    return await this.prismaService.user.findFirst({where: {email: email}, include: {student: true}})
  }
}