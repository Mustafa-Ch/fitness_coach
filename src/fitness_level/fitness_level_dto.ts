// src/fitness-level/dto/create-fitness-level.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FitnessLevelEnum } from '../fitness_level/fitness_level.entity';

export class CreateFitnessLevelDto {
  @IsEnum(FitnessLevelEnum)
  @IsNotEmpty()
  level: FitnessLevelEnum;

  @IsNotEmpty()
  userId: number;
}
