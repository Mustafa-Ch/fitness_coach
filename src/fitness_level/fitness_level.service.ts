// // src/fitness-level/fitness-level.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { FitnessLevel } from './fitness_level.entity';
// import { FitnessLevelEnum } from './fitness_level.entity';

// @Injectable()
// export class FitnessLevelService {
//   constructor(
//     @InjectRepository(FitnessLevel)
//     private fitnessLevelRepository: Repository<FitnessLevel>,
//   ) {}

//   // Fitness level create karo
//   async createFitnessLevel(level: FitnessLevelEnum): Promise<FitnessLevel> {
//     const fitnessLevel = this.fitnessLevelRepository.create({ level });
//     return this.fitnessLevelRepository.save(fitnessLevel);
//   }

//   // Saare fitness levels fetch karo
//   async getAllFitnessLevels(): Promise<FitnessLevel[]> {
//     return this.fitnessLevelRepository.find();
//   }

//   // Fitness level update karo
//   async updateFitnessLevel(
//     id: number,
//     level: FitnessLevelEnum,
//   ): Promise<FitnessLevel> {
//     const fitnessLevel = await this.fitnessLevelRepository.findOne({
//       where: { id },
//     });
//     if (!fitnessLevel) {
//       throw new Error('Fitness level not found');
//     }

//     fitnessLevel.level = level;
//     return this.fitnessLevelRepository.save(fitnessLevel);
//   }

//   // Fitness level delete karo
//   async deleteFitnessLevel(id: number): Promise<void> {
//     await this.fitnessLevelRepository.delete(id);
//   }
// }

// src/fitness-level/fitness-level.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FitnessLevel } from './fitness_level.entity';
import { FitnessLevelEnum } from './fitness_level.entity';
import { User } from '../auth/user.entity'; // Import User entity

@Injectable()
export class FitnessLevelService {
  constructor(
    @InjectRepository(FitnessLevel)
    private fitnessLevelRepository: Repository<FitnessLevel>,

    @InjectRepository(User)
    private userRepository: Repository<User>, // Inject User repository
  ) {}

  // Fitness level create karo
  async createFitnessLevel(
    level: FitnessLevelEnum,
    userId: number,
  ): Promise<FitnessLevel> {
    // Step 1: Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Step 2: Check if the user already has this fitness level
    const existingFitnessLevel = await this.fitnessLevelRepository.findOne({
      where: { userId, level },
    });

    // Step 3: If the fitness level already exists for this user, throw a conflict exception
    if (existingFitnessLevel) {
      throw new ConflictException(
        `User already has the "${level}" fitness level.`,
      );
    }

    // Step 4: Create the fitness level if it doesn't exist
    const fitnessLevel = this.fitnessLevelRepository.create({
      level,
      user,
    });

    return this.fitnessLevelRepository.save(fitnessLevel);
  }

  // Saare fitness levels fetch karo
  async getAllFitnessLevels(): Promise<FitnessLevel[]> {
    return this.fitnessLevelRepository.find({ relations: ['user'] }); // Include user details
  }

  // Fitness level update karo
  async updateFitnessLevel(
    id: number,
    level: FitnessLevelEnum,
    userId?: number,
  ): Promise<FitnessLevel> {
    // Step 1: Find the fitness level
    const fitnessLevel = await this.fitnessLevelRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!fitnessLevel) {
      throw new NotFoundException('Fitness level not found');
    }

    // Step 2: Update level
    fitnessLevel.level = level;

    // Step 3: Update user if userId is provided
    if (userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      fitnessLevel.user = user;
    }

    return this.fitnessLevelRepository.save(fitnessLevel);
  }

  // Fitness level delete karo
  async deleteFitnessLevel(id: number): Promise<void> {
    const fitnessLevel = await this.fitnessLevelRepository.findOne({
      where: { id },
    });
    if (!fitnessLevel) {
      throw new NotFoundException('Fitness level not found');
    }
    await this.fitnessLevelRepository.delete(id);
  }
}
