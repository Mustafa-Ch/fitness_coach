// src/dietary-preferences/dietary-preference.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietaryPreference } from './diet.entity';
import { DietaryPreferenceService } from './diet.service';
import { DietaryPreferenceController } from './diet.controller';
import { User } from '../auth/user.entity'; // Import User entity to register it in the module

@Module({
  imports: [
    TypeOrmModule.forFeature([DietaryPreference, User]), // Register both DietaryPreference and User entities
  ],
  controllers: [DietaryPreferenceController],
  providers: [DietaryPreferenceService],
})
export class DietaryPreferenceModule {}
