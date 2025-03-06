import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  // async register(email: string) {
  //   console.log(email);

  //   const existingUser = await this.userRepository.findOne({
  //     where: { email },
  //   });
  //   if (existingUser) {
  //     throw new BadRequestException('User already exists');
  //   }

  //   // 6-digit OTP generate karna
  //   const verificationToken = Math.floor(
  //     100000 + Math.random() * 900000,
  //   ).toString();

  //   // User create karna (password nahi hoga)
  //   const user = this.userRepository.create({ email, verificationToken });
  //   await this.userRepository.save(user);

  //   // OTP Email bhejna
  //   console.log(`Verification token: ${verificationToken}`);
  //   await this.mailerService.sendVerificationEmail(email, verificationToken);

  //   return { statusCode: 201, message: 'OTP sent to your email.' };
  // }

  async register(email: string) {
    console.log(email);

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // 6-digit OTP generate karna
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Start a transaction
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // User create karna (password nahi hoga)
      const user = this.userRepository.create({ email, verificationToken });

      // Save user in transaction
      await queryRunner.manager.save(user);

      // OTP Email bhejna
      console.log(`Verification token: ${verificationToken}`);
      await this.mailerService.sendVerificationEmail(email, verificationToken);

      // Commit transaction if everything is successful
      await queryRunner.commitTransaction();

      return { statusCode: 201, message: 'OTP sent to your email.' };
    } catch (error) {
      // If there's an error, rollback the transaction
      await queryRunner.rollbackTransaction();
      console.error('Error during registration:', error);
      throw new BadRequestException('Error occurred while registering user.');
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({
      where: { verificationToken: token },
    });
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = null;
    await this.userRepository.save(user);
    const jwtToken = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Email verified successfully',
      jwtToken,
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      },
    };
  }

  async login(email: string, password: string) {
    //  Check if user exists
    console.log('email', email);

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email not found!');
    }

    //  Compare Passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //  Generate JWT Token
    const jwtToken = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      message: 'Login successful',
      jwtToken,
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      },
    };
  }
}
