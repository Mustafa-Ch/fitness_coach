import {
  IsNumber,
  IsEnum,
  IsString,
  IsISO8601,
  IsOptional,
} from 'class-validator';
import { HealthDataType } from './healthKit.entity';

export class UpdateHealthKitDto {
  @IsOptional()
  @IsEnum(HealthDataType)
  type?: HealthDataType;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsISO8601()
  timestamp?: string;
}
