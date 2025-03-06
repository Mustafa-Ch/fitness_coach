import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { Goal } from './goal.entity';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal]), // Import Goal entity
    AuthModule, // Import AuthModule to access UserRepository
  ],
  providers: [GoalService],
  controllers: [GoalController],
})
export class GoalModule {}
