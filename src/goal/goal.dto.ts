// src/goal/dto/create-goal.dto.ts
import { IsArray, IsNotEmpty, IsEnum } from 'class-validator';
import { GoalType } from '../goal/goal.entity'; // Import GoalType enum

export class CreateGoalDto {
  @IsArray()
  @IsEnum(GoalType, { each: true }) // Validate each value in the 'types' array is a valid GoalType
  @IsNotEmpty()
  types: GoalType[];

  @IsNotEmpty()
  userId: number;
}
