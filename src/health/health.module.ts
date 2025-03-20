// src/health-data/health-data.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthData } from './health.entity';
import { HealthDataService } from './health.service';
import { HealthDataController } from './health.controller';
import { User } from '../auth/user.entity'; // Import User entity
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthData, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [HealthDataController],
  providers: [HealthDataService],
})
export class HealthDataModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(HealthDataController);
  }
}
