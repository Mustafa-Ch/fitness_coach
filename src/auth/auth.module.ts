import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity'; //  Make sure this path is correct
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule], //  Add this
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], //  If needed in other modules
})
export class AuthModule { }
