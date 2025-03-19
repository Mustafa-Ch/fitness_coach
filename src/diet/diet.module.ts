// src/dietary-preferences/dietary-preference.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietaryPreference } from './diet.entity';
import { DietaryPreferenceService } from './diet.service';
import { DietaryPreferenceController } from './diet.controller';
import { User } from '../auth/user.entity'; // Import User entity to register it in the module
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DietaryPreference, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }), // Register both DietaryPreference and User entities
  ],
  controllers: [DietaryPreferenceController],
  providers: [DietaryPreferenceService],
})
export class DietaryPreferenceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(DietaryPreferenceController);
  }
}
