// profile.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity'; // Import the Profile entity
import { ProfileService } from './profile.service'; // Import the ProfileService
import { ProfileController } from './profile.controller'; // Import the ProfileController
import { User } from '../auth/user.entity'; // Import User entity (for relation)
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ], // Register Profile and User repositories with TypeOrm
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(ProfileController);
  }
}
