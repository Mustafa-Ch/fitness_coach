// profile.dto.ts
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
  userId: number; // This links the profile to a specific user
}
