// profile.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from '../auth/user.entity';
import { CreateProfileDto } from './profile.dto';
import { UpdateProfileDto } from './profile.updateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>, // Injecting User repository
  ) {}

  // Create a profile for a user
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { userId, ...profileData } = createProfileDto;

    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user already has a profile
    const existingProfile = await this.profileRepository.findOne({
      where: { userId },
    });
    if (existingProfile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    // Create the new profile and associate it with the user
    const profile = this.profileRepository.create({ ...profileData, user });

    // Save and return the newly created profile
    return await this.profileRepository.save(profile);
  }

  // Get profile by userId
  async getProfileByUserId(userId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // Update profile for a user
  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, updateProfileDto);
    return await this.profileRepository.save(profile);
  }

  // Delete profile for a user
  async deleteProfile(userId: number): Promise<void> {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    await this.profileRepository.remove(profile);
  }
}
