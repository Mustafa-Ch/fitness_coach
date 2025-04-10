import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthData } from './health.entity';
import { User } from '../auth/user.entity'; // Assuming User entity is in the same path

@Injectable()
export class HealthDataService {
  constructor(
    @InjectRepository(HealthData)
    private healthDataRepository: Repository<HealthData>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createHealthData(
    heightFeet: number,
    heightInches: number,
    weight: number,
    age: number,
    userId: number, // Add userId parameter to associate with the user
  ): Promise<HealthData> {
    // Step 1: Check if the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Step 2: Check if the exact health data already exists for the same user
    const existingHealthData = await this.healthDataRepository.findOne({
      where: {
        userId: userId,
        heightFeet,
        heightInches,
        weight,
        age,
      },
    });

    // If the same data exists, return the existing record instead of creating a new one
    if (existingHealthData) {
      return existingHealthData; // Return the existing health data
    }

    // Step 3: If no existing data, create a new health data record
    const healthData = this.healthDataRepository.create({
      heightFeet,
      heightInches,
      weight,
      age,
      user, // Associate the health data with the user
    });

    return this.healthDataRepository.save(healthData);
  }

  async getAllHealthData(): Promise<HealthData[]> {
    return this.healthDataRepository.find();
  }

  async updateHealthData(
    id: number,
    heightFeet: number,
    heightInches: number,
    weight: number,
    age: number,
    userId: number,
  ): Promise<HealthData> {
    const healthData = await this.healthDataRepository.findOne({
      where: { id },
    });

    if (!healthData) {
      throw new Error('Health data not found');
    }

    if (healthData.userId !== userId) {
      throw new Error('This health data does not belong to the provided user');
    }

    healthData.heightFeet = heightFeet;
    healthData.heightInches = heightInches;
    healthData.weight = weight;
    healthData.age = age;

    return this.healthDataRepository.save(healthData);
  }

  async deleteHealthData(id: number): Promise<void> {
    await this.healthDataRepository.delete(id);
  }
}
