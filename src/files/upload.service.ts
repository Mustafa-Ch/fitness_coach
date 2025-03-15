// src/file-upload/services/file-upload.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { UploadedFile } from './uploaded-file.entity';
import { File } from './file.interface';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadFile(userId: number, file: File): Promise<UploadedFile> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const uploadedFile = this.uploadedFileRepository.create({
      filename: file.filename,
      fileUrl: `/uploads/${file.filename}`,
      fileType: file.mimetype,
      user,
    });

    return this.uploadedFileRepository.save(uploadedFile);
  }

  async getFiles(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const files = await this.uploadedFileRepository.find({ where: { user } });
    return files;
  }
}
