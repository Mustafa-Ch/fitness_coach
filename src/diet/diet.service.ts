import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DietaryPreference, DietaryPreferenceEnum } from './diet.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class DietaryPreferenceService {
  constructor(
    @InjectRepository(DietaryPreference)
    private dietaryPreferenceRepository: Repository<DietaryPreference>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create multiple dietary preferences for a user
  async createDietaryPreferences(
    preferences: DietaryPreferenceEnum[],
    userId: number,
    explanation?: string,
  ): Promise<DietaryPreference[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const responses: DietaryPreference[] = [];
    const conflicts: string[] = [];

    for (const preference of preferences) {
      const existingPreference = await this.dietaryPreferenceRepository.findOne(
        {
          where: { userId, preference },
        },
      );

      if (existingPreference) {
        conflicts.push(
          `User already has the "${preference}" dietary preference.`,
        );
        continue;
      }

      const dietaryPreference = this.dietaryPreferenceRepository.create({
        preference,
        explanation,
        user,
      });

      const savedPreference =
        await this.dietaryPreferenceRepository.save(dietaryPreference);
      responses.push(savedPreference);
    }

    if (conflicts.length > 0) {
      throw new ConflictException(conflicts.join(', '));
    }

    return responses;
  }

  async getDietaryPreferencesByUser(
    userId: number,
  ): Promise<DietaryPreference[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.dietaryPreferenceRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async getAllDietaryPreferences(): Promise<DietaryPreference[]> {
    return this.dietaryPreferenceRepository.find({ relations: ['user'] });
  }

  async updateDietaryPreference(
    id: number,
    preference: DietaryPreferenceEnum,
    explanation?: string,
  ): Promise<DietaryPreference> {
    const dietaryPreference = await this.dietaryPreferenceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!dietaryPreference) {
      throw new NotFoundException('Dietary preference not found');
    }

    dietaryPreference.preference = preference;

    if (explanation) {
      dietaryPreference.explanation = explanation;
    }

    return this.dietaryPreferenceRepository.save(dietaryPreference);
  }

  async deleteDietaryPreference(id: number): Promise<void> {
    const dietaryPreference = await this.dietaryPreferenceRepository.findOne({
      where: { id },
    });
    if (!dietaryPreference) {
      throw new NotFoundException('Dietary preference not found');
    }
    await this.dietaryPreferenceRepository.delete(id);
  }
}
