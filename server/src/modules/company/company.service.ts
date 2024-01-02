import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { Company, Superviser } from '@prisma/client';
import { CreateDto } from './dto/company.dto';

@Injectable()
export class CompanyService {

    constructor(private readonly companyRepository: CompanyRepository) {}

    async findAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.findAllCompanies();
    }

    async findCompany(companyId: number): Promise<Company> {
        return await this.companyRepository.findCompany(companyId);
    }

    async findSupervisors(companyId: number): Promise<Superviser[]> {
        return await this.companyRepository.findSupervisors(companyId);
    }

    async createCompany(createCompanyDto: CreateDto): Promise<Company> {
        return await this.companyRepository.createCompany(createCompanyDto);
    }

    async updateCompany(updateCompanyDto: Partial<Company>): Promise<Company> {
        return await this.companyRepository.updateCompany(updateCompanyDto);
    }

    async deleteCompany(companyId: number): Promise<boolean>  {
        return await this.companyRepository.deleteCompany(companyId);
    }
}
