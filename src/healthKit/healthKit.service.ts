import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthKit } from './healthKit.entity';
import { CreateHealthKitDto } from './healthKit.dto';
import { User } from '../auth/user.entity';
import { UpdateHealthKitDto } from './healthKit.updateDto';

@Injectable()
export class HealthKitService {
  constructor(
    @InjectRepository(HealthKit)
    private healthKitRepository: Repository<HealthKit>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createHealthData(createHealthKitDto: CreateHealthKitDto) {
    const { userId, data } = createHealthKitDto;

    // Check if the user exists (optional)
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Loop over data array and check if the record already exists
    const healthEntries = await Promise.all(
      data.map(async (entry) => {
        // Check if the health data already exists for the user with the same type and timestamp
        const existingRecord = await this.healthKitRepository.findOne({
          where: {
            userId,
            type: entry.type,
            timestamp: new Date(entry.timestamp),
          },
        });

        if (existingRecord) {
          // If the record exists, update it
          existingRecord.value = entry.value;
          existingRecord.unit = entry.unit;
          // Return the updated entry
          return this.healthKitRepository.save(existingRecord);
        } else {
          // If the record doesn't exist, create a new entry
          const newEntry = this.healthKitRepository.create({
            userId,
            user,
            type: entry.type,
            value: entry.value,
            unit: entry.unit,
            timestamp: new Date(entry.timestamp),
          });
          // Return the newly created entry
          return this.healthKitRepository.save(newEntry);
        }
      }),
    );

    // Return the list of created/updated health entries
    return healthEntries;
  }

  async updateHealthData(healthKitId: number, updateDto: UpdateHealthKitDto) {
    const existingEntry = await this.healthKitRepository.findOne({
      where: { id: healthKitId },
    });

    if (!existingEntry) {
      throw new NotFoundException(
        `HealthKit entry with ID ${healthKitId} not found`,
      );
    }

    Object.assign(existingEntry, updateDto); // Merge new values into existing entry

    return this.healthKitRepository.save(existingEntry);
  }
  async getUserHealthData(userId: number): Promise<HealthKit[]> {
    return this.healthKitRepository.find({ where: { userId } });
  }
}
