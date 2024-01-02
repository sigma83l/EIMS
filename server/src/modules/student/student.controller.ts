import { 
    Controller,
    Get,
    Post,
    HttpStatus,
    HttpCode,
    ParseIntPipe,
    Param,
    UseGuards,
    SetMetadata,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { AtGuard } from '../auth/guards/at.guard';
import { UserTypeGuard } from '../auth/guards/user-type.guard';
import { UserType } from '../auth/types';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // async create(@Body() createUserDto: User) {
    //   return this.userService.create(createUserDto);
    // }
    @Get('example')
    async example() {
      console.log('hello world')
        return "hello folks";
    }
    @Get('all')
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    @HttpCode(HttpStatus.OK)
    async findAll() {
      return await this.studentService.findAll();
    }
  
    @Get(':id')
    @UseGuards(AtGuard, UserTypeGuard)
    @SetMetadata('userType', UserType.Coordinator)
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id:number) {
      const result = await this.studentService.findOne(id);
      return JSON.stringify(result)
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
}