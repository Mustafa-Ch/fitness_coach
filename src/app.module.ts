import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoalModule } from './goal/goal.module';
import { HealthDataModule } from './health/health.module';
import { FitnessLevelModule } from './fitness_level/fitness_level.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // Initialize ConfigModule to load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: '.env', // Path to your environment variables
    }),

    // Database connection setup using TypeOrm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1', // Database host from environment variable
      port: +process.env.DB_PORT! || 5432, // Convert the port to number
      username: process.env.DB_USERNAME, // Database username from environment variable
      password: process.env.DB_PASSWORD, // Database password from environment variable
      database: process.env.DB_DATABASE, // Database name from environment variable
      autoLoadEntities: true, // Automatically load all entities (if you have any)
      synchronize: true, // Automatically sync schema with the database (recommended for dev)
      logging: true, // Enable logging of queries for debugging
      ssl: false, // Disable SSL (set to true if you use SSL)
      extra: {
        connectionLimit: 10, // Set connection limit to 10
      },
    }),

    // Example AuthModule (you can replace or remove this if it's not needed)
    AuthModule,
    GoalModule,
    HealthDataModule,
    FitnessLevelModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
