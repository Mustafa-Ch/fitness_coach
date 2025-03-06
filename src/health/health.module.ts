// src/health-data/health-data.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthData } from './health.entity';
import { HealthDataService } from './health.service';
import { HealthDataController } from './health.controller';
import { User } from '../auth/user.entity'; // Import User entity

@Module({
  imports: [TypeOrmModule.forFeature([HealthData, User])], // Ensure both HealthData and User are imported
  controllers: [HealthDataController],
  providers: [HealthDataService],
})
export class HealthDataModule {}
