import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards, } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDto } from './dto/department.dto';
import { Roles } from 'src/common/decorators';
import { Role, UserType } from '../auth/types';
import { Coordinator, Department } from '@prisma/client';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Get('departments')
    @HttpCode(HttpStatus.OK)
    async getAllCompanies(): Promise<Department[]> {
        return await this.departmentService.findAllDepartments();
    }

    @Get('department')
    @HttpCode(HttpStatus.OK)
    async getDepartment(@Body('departmentId', ParseIntPipe) departmentId: number): Promise<Department> {
        return await this.departmentService.findDepartment(departmentId);
    }

    @Get('coordinators')
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    @HttpCode(HttpStatus.OK)
    async getSupervisors(@Body('departmentId', ParseIntPipe) departmentId: number): Promise<Coordinator[]> {
        return await this.departmentService.findCoordinators(departmentId);
    }

    @Post('create-department')//---------------------------------update-needed------------------
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    // @Roles(Role.Admin)
    async createDepartment(@Body() createDepartmentDto: CreateDto): Promise<Department> {
        return await this.departmentService.createDepartment(createDepartmentDto);
    }

    @Patch('update-department')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    // @Roles(Role.Admin)
    async updateDepartment(@Param('departmentId', ParseIntPipe) departmentId: number,
                        @Body() updateDepartmentDto: Partial<Department>): Promise<Department> {
        return await this.departmentService.updateDepartment(updateDepartmentDto)
    }

    @Delete('delete-department')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    // @Roles(Role.Admin)
    async deleteDepartment(@Param('departmentId', ParseIntPipe) departmentId: number): Promise<boolean> {
        return await this.departmentService.deleteDepartment(departmentId);
    }

}
