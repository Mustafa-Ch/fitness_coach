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

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    let { userId, ...profileData } = createProfileDto;
    userId = Number(userId);
    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingProfile = await this.profileRepository.findOne({
      where: { userId },
    });
    if (existingProfile) {
      throw new BadRequestException('Profile already exists for this user');
    }

    const profile = this.profileRepository.create({
      ...profileData,
      user,
    });

    return await this.profileRepository.save(profile);
  }

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

  async deleteProfile(userId: number): Promise<void> {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    await this.profileRepository.remove(profile);
  }
}
