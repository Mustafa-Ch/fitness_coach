import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  IsISO8601,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HealthDataType } from './healthKit.entity';

export class HealthDataEntryDto {
  @IsNotEmpty()
  @IsEnum(HealthDataType)
  type: HealthDataType;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsISO8601()
  timestamp: string;
}

export class CreateHealthKitDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HealthDataEntryDto)
  data: HealthDataEntryDto[];
}
