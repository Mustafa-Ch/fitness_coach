// src/file-upload/controllers/file-upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  NotFoundException,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './upload.service';
import { UploadFileDto } from './upload-file.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post(':userId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    if (!file) {
      throw new NotFoundException('File not found');
    }
    console.log(file);
    const uploadedFile = await this.fileUploadService.uploadFile(userId, file);
    return {
      message: 'File uploaded successfully',
      file: uploadedFile,
    };
  }

  @Get(':userId')
  async getFiles(@Param('userId') userId: number) {
    const files = await this.fileUploadService.getFiles(userId);
    return files;
  }
}
