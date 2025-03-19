// src/file-upload/file-upload.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UploadedFile } from './uploaded-file.entity';
import { FileUploadService } from './upload.service';
import { FileUploadController } from './upload.controller';
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UploadedFile]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(FileUploadController);
  }
}
