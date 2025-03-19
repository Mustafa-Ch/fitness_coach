import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
@Injectable()
export class AuthService {
  private client = new OAuth2Client(
    '86654140826-vehr804igibgk1rhn8bc6k3tuoeqcen9.apps.googleusercontent.com',
  );
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    console.log(password);

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

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const user = this.userRepository.create({
        email,
        password: hashPassword,
        verificationToken,
      });
      await this.userRepository.save(user);

      await this.mailerService.sendVerificationEmail(email, verificationToken);
      return { statusCode: 201, message: 'OTP sent to your email.' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error occurred while registering user.');
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

    const jwtToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
    );

    await this.userRepository.save(user);

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

  async registerWithGoogle(email: string, token: string) {
    const googlePayload = await this.verifyGoogleToken(token);
    console.log(googlePayload);

    if (!googlePayload || googlePayload.email !== email) {
      throw new BadRequestException('Invalid or mismatched Google token.');
    }

    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      await this.userRepository.save(user);
      const jwtToken = this.jwtService.sign(
        { id: user?.id, email: user?.email },
        { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
      );
      return {
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
        },
        accessToken: jwtToken,
      };
    }

    if (!user) {
      user = this.userRepository.create({
        email,
        isVerified: true,
        verificationToken: null,
      });

      await this.userRepository.save(user);
      const jwtToken = this.jwtService.sign(
        { id: user?.id, email: user?.email },
        { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
      );
      return {
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
        },
        accessToken: jwtToken,
      };
    } else {
      throw new BadRequestException('User already exists.');
    }
  }

  private async verifyGoogleToken(idToken: string) {
    // console.log(idToken)
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience:
          '86654140826-vehr804igibgk1rhn8bc6k3tuoeqcen9.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      console.error('Google token verification failed:', error); // Log error
      throw new BadRequestException('Invalid or expired Google token.');
    }
  }

  async login(email: string, password: string) {
    console.log('email', email);

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Password or email is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Password or email is incorrect');
    }

    const jwtToken = this.jwtService.sign(
      { id: user.id, email: user?.email },
      { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
    );
    await this.userRepository.save(user);
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

  async registerWithApple(appleUserId: string, email: string) {
    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      const jwtToken = this.jwtService.sign(
        { id: user.id, email: user?.email },
        { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
      );
      return {
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
          token: jwtToken,
        },
      };
    }

    user = this.userRepository.create({
      email,
      isVerified: true,
    });
    await this.userRepository.save(user);
    const jwtToken = this.jwtService.sign(
      { id: user?.id, email: user?.email },
      { expiresIn: '7d', secret: process.env.JWT_SECRET_KEY },
    );
    return {
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        token: jwtToken,
      },
    };
  }
}
