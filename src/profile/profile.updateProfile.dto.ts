// profile.dto.ts
import { IsString, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
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
}
