// src/file-upload/file-upload.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UploadedFile } from './uploaded-file.entity';
import { FileUploadService } from './upload.service';
import { FileUploadController } from './upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UploadedFile])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
