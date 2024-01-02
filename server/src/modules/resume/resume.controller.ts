import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadResumeDto } from './dto/upload-resume.dto';
  import { ResumeService } from './resume.service';
  import { Roles } from '../../common/decorators/roles.decorator';
  import { Role } from '../auth/types/roles.enum';
  import { Resume as FileModel } from '@prisma/client';
  import { File } from 'src/common/interfaces/file.interface';
  import { UpdateResumeDto } from './dto/update-resume.dto';
  import { GetCurrentUserId, Public } from '../../common/decorators';
  import { RtGuard } from '../../modules/auth/guards/rt.guard';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {}
  
    @Post(':subId')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
      @UploadedFile(
        new ParseFilePipe({
          validators: [new MaxFileSizeValidator({ maxSize: 1042 * 1024 * 100 })],
        }),
      )
      file: File,
      @Body() body: UploadResumeDto,
      @Param('subId', ParseIntPipe) subId: number,
    ) {
      return await this.resumeService.saveFile(subId, file, body);
    }
  
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async deleteFile(@Param('id') id: number) {
      return await this.resumeService.deleteFile(id);
    }
  
    @Roles(Role.Admin)
    @Get('unverifieds')
    async findUnverifieds(): Promise<FileModel[]> {
      return await this.resumeService.findUnverifieds();
    }

    @Public()
    @Get(':id')
    async findById(
      @Param('id', ParseIntPipe) fileId: number,
    ): Promise<FileModel | undefined> {
      return await this.resumeService.findByIdOrThrowExpection(fileId);
    }
  
    @Roles(Role.Admin)
    @Post('accept/:id')
    async accept(@Param('id', ParseIntPipe) fileId: number) {
      return await this.resumeService.accept(fileId);
    }
  
    @Roles(Role.Admin)
    @Patch('update/:id')
    @HttpCode(HttpStatus.OK)
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateFileDto: UpdateResumeDto,
    ) {
      return await this.resumeService.update(id, updateFileDto);
    }
  
  
  }