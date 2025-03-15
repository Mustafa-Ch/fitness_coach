import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

// DTO for user registration (email)
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

// DTO for verifying email (OTP token)
export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

// DTO for registering with Google
export class RegisterWithGoogleDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
