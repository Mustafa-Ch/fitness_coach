import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessLevel } from './fitness_level.entity';
import { FitnessLevelService } from './fitness_level.service';
import { FitnessLevelController } from './fitness_level.controller';
import { User } from '../auth/user.entity'; // Import the User entity to register it in the module

@Module({
  imports: [
    TypeOrmModule.forFeature([FitnessLevel, User]), // Register both FitnessLevel and User entities
  ],
  controllers: [FitnessLevelController],
  providers: [FitnessLevelService],
})
export class FitnessLevelModule {}
