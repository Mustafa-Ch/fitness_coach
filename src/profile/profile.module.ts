// profile.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity'; // Import the Profile entity
import { ProfileService } from './profile.service'; // Import the ProfileService
import { ProfileController } from './profile.controller'; // Import the ProfileController
import { User } from '../auth/user.entity'; // Import User entity (for relation)

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])], // Register Profile and User repositories with TypeOrm
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
