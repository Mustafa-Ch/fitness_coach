import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, VerifyEmailDto } from './auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email);
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

    //  Profile Setup Route
    @Post('setup-profile')
    @UseGuards(JwtAuthGuard) // 🛡️ Protect Route
    async setupProfile(
        @Req() req,
        @Body() body: { name: string; gender: string; age: number; profilePicture: string }
    ) {
        return this.authService.setupProfile(req.user.id, body.name, body.gender, body.age, body.profilePicture);
    }
}
