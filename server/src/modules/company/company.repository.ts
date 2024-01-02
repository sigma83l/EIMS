import { Injectable } from '@nestjs/common';
import { Company, Superviser, WorkingFields } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto/company.dto';

@Injectable()
export class CompanyRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAllCompanies(): Promise<Company[]> {
        return await this.prismaService.company.findMany({});
    }

    async findCompany(companyId: number): Promise<Company> {
        return await this.prismaService.company.findUnique({
            where: {
                id: companyId
            }
        });
    }

    async findSupervisors(companyId: number): Promise<Superviser[]> {
        const company = await this.prismaService.company.findUnique({
            where: {
                id: companyId
            },
            include: {
                    superviser: true, // Include the superviser relation
                },
            });
            
        return company?.superviser as Superviser[] || [];
    }

    async createCompany(createCompnayDto: CreateDto): Promise<Company> {
        return await this.prismaService.company.create({
            data: {
                description: createCompnayDto.description,
                email: createCompnayDto.email,
                postalAddr: createCompnayDto.postalAddr,
                telephoneNumber: createCompnayDto.telephoneNumber,
                webAddr: createCompnayDto.webAddr,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                fax: createCompnayDto.fax,
                workingFields: createCompnayDto.workingFields
            }
        });
    }

    async updateCompany(updateCompanyDto: Partial<Company>): Promise<Company> {
        return await this.prismaService.company.upsert({
            create: {
                description: updateCompanyDto.description,
                email: updateCompanyDto.email,
                postalAddr: updateCompanyDto.postalAddr,
                telephoneNumber: updateCompanyDto.telephoneNumber,
                webAddr: updateCompanyDto.webAddr,
                fax: updateCompanyDto.fax,
                workingFields: updateCompanyDto.workingFields,
            },
            update: {
                updatedAt: new Date().toISOString() 
            },
            where: {
                id: updateCompanyDto.id
            }
        });
    }

    async deleteCompany(companyId: number): Promise<boolean>  {
        const res = await this.prismaService.company.delete({
            where: {
                id:companyId
            }
        });
        if (res) {
            return true;
        }
        else 
            return false;
    }
}
