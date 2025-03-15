import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto, VerifyEmailDto } from './auth.dto';
import { RegisterWithGoogleDto } from './googleDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('verify')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.token);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register-with-google')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async registerWithGoogle(@Body() body: RegisterWithGoogleDto) {
    return this.authService.registerWithGoogle(body.email, body.token);
  }

  @Post('register-with-apple')
  async registerWithApple(@Body() body: { appleUserId; email }) {
    return this.authService.registerWithApple(body.appleUserId, body.email);
  }
}
