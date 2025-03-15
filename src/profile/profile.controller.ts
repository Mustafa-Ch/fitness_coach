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
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';
import { UpdateProfileDto } from './profile.updateProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post('create')
  // @UsePipes(new ValidationPipe())
  // async createProfile(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.createProfile(createProfileDto);
  // }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `profile-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createProfile(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    if (!profilePicture) {
      throw new NotFoundException('Profile picture not found');
    }

    // Generate the file URL
    const profilePictureUrl = `/uploads/${profilePicture.filename}`;

    // Merge the file URL into the DTO
    const updatedDto = {
      ...createProfileDto,
      profilePicture: profilePictureUrl,
    };

    // Call the service to create the profile
    return this.profileService.createProfile(updatedDto);
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
