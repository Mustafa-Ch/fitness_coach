// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { User } from './user.entity'; //  Make sure this path is correct
// import { MailerModule } from '../mailer/mailer.module';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     MailerModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET_KEY || 'your_secret_key',
//     }),
//   ], //  Add this

//   controllers: [AuthController],
//   providers: [AuthService],
//   exports: [AuthService], //  If needed in other modules
// })
// export class AuthModule {}

// src/auth/auth.module.ts
// src/auth/auth.module.ts
// import { Module, forwardRef } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user.entity';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { GoalModule } from '../goal/goal.module'; // Import GoalModule

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     forwardRef(() => GoalModule), // Use forwardRef to handle circular dependency
//   ],
//   providers: [AuthService],
//   controllers: [AuthController],
//   exports: [TypeOrmModule],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '../mailer/mailer.module'; // Import MailerModule
import { JwtModule } from '@nestjs/jwt'; // For JWT handling

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
    MailerModule, // Make sure MailerModule is imported here
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'your_secret_key', // Make sure the JWT secret is set correctly
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule, AuthService], // Export TypeOrmModule and AuthService so that they can be imported in other modules
})
export class AuthModule {}
