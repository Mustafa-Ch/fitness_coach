import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly mailerService: MailerService,
    ) { }

    async register(email: string, password: string) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        // const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = this.userRepository.create({ email, password, verificationToken });
        await this.userRepository.save(user);

        // Send verification email (Email sending setup alag se karni padegi)
        console.log(`Verification token: ${verificationToken}`);
        await this.mailerService.sendVerificationEmail(email, verificationToken);

        return { message: 'User registered. Check your email for verification link.' };
    }

    async verifyEmail(token: string) {
        const user = await this.userRepository.findOne({ where: { verificationToken: token } });
        if (!user) {
            throw new Error('Invalid or expired token');
        }

        user.isVerified = true;
        user.verificationToken = null;
        await this.userRepository.save(user);

        return { message: 'Email verified successfully' };
    }

}
