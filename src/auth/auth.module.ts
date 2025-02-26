import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity'; //  Make sure this path is correct
import { MailerModule } from '../mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'your_secret_key',
    }),
  ], //  Add this

  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], //  If needed in other modules
})
export class AuthModule { }
