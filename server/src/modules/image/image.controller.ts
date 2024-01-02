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
  import { UploadImageDto } from './dto/upload-image.dto';
  import { ImageService } from './image.service';
  import { Roles } from '../../common/decorators/roles.decorator';
  import { Role } from '../auth/types/roles.enum';
  import { Image as FileModel } from '@prisma/client';
  import { File } from 'src/common/interfaces/file.interface';
  import { UpdateImageDto } from './dto/update-image.dto';
  import { GetCurrentUserId, Public } from '../../common/decorators';
  import { RtGuard } from '../../modules/auth/guards/rt.guard';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}
  
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
      @Body() body: UploadImageDto,
      @Param('subId', ParseIntPipe) subId: number,
    ) {
      
      return await this.imageService.saveFile(subId, body.type, file);
    }
  
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async deleteFile(@Param('id') id: number) {
      return await this.imageService.deleteFile(id);
    }
  
    @Roles(Role.Admin)
    @Get('unverifieds')
    async findUnverifieds(): Promise<FileModel[]> {
      return await this.imageService.findUnverifieds();
    }

    @Public()
    @Get(':id')
    async findById(
      @Param('id', ParseIntPipe) fileId: number,
    ): Promise<FileModel | undefined> {
      return await this.imageService.findByIdOrThrowExpection(fileId);
    }
  
    @Roles(Role.Admin)
    @Post('accept/:id')
    async accept(@Param('id', ParseIntPipe) fileId: number) {
      return await this.imageService.accept(fileId);
    }
  
    @Roles(Role.Admin)
    @Patch('update/:id')
    @HttpCode(HttpStatus.OK)
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateFileDto: UpdateImageDto,
    ) {
      return await this.imageService.update(id, updateFileDto);
    }
  
  
  }
