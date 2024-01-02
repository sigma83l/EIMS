import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors, SetMetadata } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { createApplicationDto } from './dto/application.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserType } from '../auth/types';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService){}

    @Get('applications/coordinator')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    async findApplicationsByCoordinatorId(@GetCurrentUserId() user) {
        return await this.applicationService.findApplicationsByCoordinatorId(user.id);
    }

    @Get('applications/student')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Student)
    async findApplicationsByStudentId(@GetCurrentUserId() user) {
        return await this.applicationService.findApplicationsByStudentId(user.id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Student)
    async createApplication(@GetCurrentUser() user, @Body() createDto: createApplicationDto, @UploadedFile() file: Express.Multer.File) {
        return await this.applicationService.createApplication(user.email, createDto, file);
    }

    @Patch('decline')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    async declineApplication(@Param('applicatioId') applicationId: number) {
        return await this.applicationService.declineApplication(applicationId);
    }
 
    @Post('upload')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    async approveApplication(@Param('applicatioId') applicationId: number) {
        return await this.applicationService.approveApplication(applicationId);
    }

    @Delete('delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    // @Role
    async deleteApplication(@Param('applicatioId') applicationId: number) {
        return await this.applicationService.deleteApplication(applicationId);
    } 
}
