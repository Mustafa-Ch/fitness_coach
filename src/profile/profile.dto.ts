// profile.dto.ts
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  IsInt,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsDateString()
  @IsOptional()
  birthday: string;

  @IsUrl()
  @IsOptional()
  profilePicture: string;

  @IsInt()
  @Type(() => Number)
  userId: number;
}
