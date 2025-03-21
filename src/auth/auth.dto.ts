import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @Length(6, 20, {
    message: 'Confirm password must be between 6 and 20 characters',
  })
  confirmPassword: string;
}

export class VerifyEmailDto {
  @IsNotEmpty({ message: 'Verification token is required' })
  token: string;
}
