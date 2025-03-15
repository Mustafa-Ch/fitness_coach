import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { DietaryPreferenceEnum } from './diet.entity';

export class CreateDietaryPreferenceDto {
  @IsArray() // Ensures preference is an array
  @IsEnum(DietaryPreferenceEnum, { each: true }) // Validates each element in the array as a valid enum
  @IsNotEmpty()
  preference: DietaryPreferenceEnum[];

  @IsOptional() // Explanation is optional
  @IsString()
  explanation?: string;

  @IsNotEmpty() // Ensure userId is provided
  userId: number;
}
