import { Controller, Get,Post, HttpCode, HttpStatus, Param, ParseIntPipe, Body, UseGuards, SetMetadata } from '@nestjs/common';
import { SuperviserService } from './superviser.service';
import { AssessmentCriteriaDto } from './dto/assessment.dto';
import { UserType } from '../auth/types';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('supervisor')
export class SuperviserController {
    constructor(private readonly superviserService: SuperviserService) {}

    @Get('all')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AtGuard, UserTypeGuard)
    // @SetMetadata('userType', UserType.Coordinator)
    async findAll() {
      return await this.superviserService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    async findOne(@Param('id', ParseIntPipe) id:number) {
      const result = await this.superviserService.findOne(id);
      return JSON.stringify(result);
    }

    @Post('assessment')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Superviser)
    async AssessStudent(@Body() assessmentCriteriaDto: AssessmentCriteriaDto) {
      return await this.superviserService.AssessStudent(assessmentCriteriaDto);
    }

}
