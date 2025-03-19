import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthKit } from './healthKit.entity';
import { User } from '../auth/user.entity';
import { HealthKitService } from './healthKit.service';
import { HealthKitController } from './healthKit.controller';
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthKit, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [HealthKitController],
  providers: [HealthKitService],
})
export class HealthKitModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(HealthKitController);
  }
}
