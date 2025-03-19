import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { DietaryPreferenceEnum } from './diet.entity';

export class CreateDietaryPreferenceDto {
  @IsArray()
  @IsEnum(DietaryPreferenceEnum, { each: true })
  @IsNotEmpty()
  preference: DietaryPreferenceEnum[];

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsNotEmpty()
  userId: number;
}
