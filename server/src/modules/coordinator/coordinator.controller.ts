import { 
    Controller,
    Get,
    Post,
    HttpStatus,
    HttpCode,
    ParseIntPipe,
    Param,
} from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';

@Controller('coordinator')
export class CoordinatorController {
    constructor(private readonly coordinatorService: CoordinatorService) {}

    @Get('all')
    // @UseGuards(AuthGuard('passport-local'))
    @HttpCode(HttpStatus.OK)
    async findAll() {
      return await this.coordinatorService.findAll();
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id:number) {
      const result = await this.coordinatorService.findOne(id);
      return JSON.stringify(result);
    }
    
    /*
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateProfileDto: UpdateUserDto) {
      return this.userService.update(id, updateProfileDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.userService.softDelete(id);
    }*/

    @Get('departments')
    @HttpCode(HttpStatus.OK)
    async getAllDepartments() {
      return await this.coordinatorService.getAllDepartments();
    }
}
