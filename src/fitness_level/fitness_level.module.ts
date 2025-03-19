import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessLevel } from './fitness_level.entity';
import { FitnessLevelService } from './fitness_level.service';
import { FitnessLevelController } from './fitness_level.controller';
import { User } from '../auth/user.entity'; // Import the User entity to register it in the module
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([FitnessLevel, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }), // Register both FitnessLevel and User entities
  ],
  controllers: [FitnessLevelController],
  providers: [FitnessLevelService],
})
export class FitnessLevelModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(FitnessLevelController);
  }
}
