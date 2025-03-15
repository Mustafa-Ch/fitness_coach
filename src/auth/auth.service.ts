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
    // Find the user by the verification token
    const user = await this.userRepository.findOne({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = null;
    // Generate the JWT token (e.g., for login)
    const jwtToken = this.jwtService.sign({ id: user.id, email: user.email });

    // Save the JWT token in the database (optional, can be stored for sessions)
    user.accessToken = jwtToken;

    // Save the updated user
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

  //   async registerWithGoogle(email: string, token: string,type:string) {
  //     const googlePayload = await this.verifyGoogleToken(token);
  //     console.log(googlePayload);
  //     if (!googlePayload || googlePayload.email !== email) {
  //       throw new BadRequestException('Invalid or mismatched Google token.');
  //     }

  //     let user = await this.userRepository.findOne({
  //       where: { email },
  //     });
  // if(type=='login'){
  //   if (user) {
  //     user.accessToken = token; // Update the access token
  //     await this.userRepository.save(user); // Save the updated user record
  //    return {
  //       message: 'User logged in successfully with Google.',
  //       user: {
  //         id: user.id,
  //         email: user.email,
  //         isVerified: user.isVerified,
  //       },
  //       accessToken: token, // Return the new Google access token
  //     };
  //   }else{
  //     if(user){
  //       throw new BadRequestException('User already exist')
  //     }
  //   }
  // }

  //     // Step 4: Create a new user record if not exists
  //     user = this.userRepository.create({
  //       email,
  //       isVerified: true,
  //       verificationToken: null,
  //       accessToken: token,
  //     });

  //     // Step 5: Save the new user record to the database
  //     await this.userRepository.save(user);

  //     return {
  //       message: 'User registered successfully with Google.',
  //       user: {
  //         id: user.id,
  //         email: user.email,
  //         isVerified: user.isVerified,
  //       },
  //       accessToken: token, // Return the Google access token
  //     };
  //   }
  async registerWithGoogle(email: string, token: string) {
    // Step 1: Verify the Google Token
    const googlePayload = await this.verifyGoogleToken(token);
    console.log(googlePayload);

    // Check if the email from Google matches the email passed in
    if (!googlePayload || googlePayload.email !== email) {
      throw new BadRequestException('Invalid or mismatched Google token.');
    }

    // Step 2: Check if the user already exists in the database
    let user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      user.accessToken = token; // Update the access token
      await this.userRepository.save(user); // Save the updated user record

      return {
        message: 'User logged in successfully with Google.',
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
        },
        accessToken: token, // Return the new Google access token
      };
    }

    // If the type is not 'login' (i.e., user is registering)
    if (!user) {
      // Step 3: Create a new user record if user does not exist
      user = this.userRepository.create({
        email,
        isVerified: true, // Assuming user is verified immediately
        verificationToken: null,
        accessToken: token,
      });

      // Step 4: Save the new user record to the database
      await this.userRepository.save(user);

      return {
        message: 'User registered successfully with Google.',
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
        },
        accessToken: token, // Return the Google access token
      };
    } else {
      // This will never be reached because we already checked in the `login` condition
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
    //  Check if user exists
    console.log('email', email);

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Password or email is incorrect');
    }

    //  Compare Passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Password or email is incorrect');
    }

    //  Generate JWT Token
    const jwtToken = this.jwtService.sign({ id: user.id, email: user.email });
    user.accessToken = jwtToken;
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
    // Step 1: Check if user exists
    let user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      user.accessToken = appleUserId;
      return {
        message: 'User logged in successfully with Apple.',
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.isVerified,
        },
      };
    }

    // Step 2: Register a new user if not found
    user = this.userRepository.create({
      email,
      isVerified: true, // Assuming Apple users are verified
      accessToken: appleUserId,
    });
    await this.userRepository.save(user);
    return {
      message: 'User registered successfully with Apple.',
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        accessToken: user.accessToken,
      },
    };
  }
}
