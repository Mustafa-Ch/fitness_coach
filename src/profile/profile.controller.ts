// profile.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';
import { UpdateProfileDto } from './profile.updateProfile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(createProfileDto);
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: number) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Put('update/:userId')
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @Param('userId') userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(userId, updateProfileDto);
  }

  @Delete('delete/:userId')
  async deleteProfile(@Param('userId') userId: number) {
    return this.profileService.deleteProfile(userId);
  }
}
