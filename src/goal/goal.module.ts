import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { Goal } from './goal.entity';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule
import { JwtMiddleware } from 'src/jwtMiddleWare';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    AuthModule,
  ],
  providers: [GoalService],
  controllers: [GoalController],
})
export class GoalModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(GoalController);
  }
}
