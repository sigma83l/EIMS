import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards, } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateDto } from './dto/company.dto';
import { Roles } from 'src/common/decorators';
import { Role, UserType } from '../auth/types';
import { Company, Superviser } from '@prisma/client';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get('companies')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    async getAllCompanies(): Promise<Company[]> {
        return await this.companyService.findAllCompanies();
    }

    @Get('company')
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    @HttpCode(HttpStatus.OK)
    async getCompany(@Body('companyId', ParseIntPipe) companyId: number): Promise<Company> {
        return await this.companyService.findCompany(companyId);
    }

    @Get('supervisors')
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    @HttpCode(HttpStatus.OK)
    async getSupervisors(@Body('companyId', ParseIntPipe) companyId: number): Promise<Superviser[]> {
        return await this.companyService.findSupervisors(companyId);
    }

    @Post('create-company')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    // @Roles(Role.Admin)
    async createCompany(@Body() createCompanyDto: CreateDto): Promise<Company> {
        return await this.companyService.createCompany(createCompanyDto);
    }

    @Patch('update-company')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    // @Roles(Role.Admin)
    async updateCompany(@Param('companyId', ParseIntPipe) companyId: number,
                        @Body() updateCompanyDto: Partial<Company>): Promise<Company> {
        return await this.companyService.updateCompany(updateCompanyDto)
    }

    @Delete('delete-company')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    // @Roles(Role.Admin)
    async deleteCompany(@Param('companyId', ParseIntPipe) companyId: number): Promise<boolean> {
        return await this.companyService.deleteCompany(companyId);
    }
}
