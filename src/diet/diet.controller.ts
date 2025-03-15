import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DietaryPreferenceService } from './diet.service';
import { CreateDietaryPreferenceDto } from './diet.dto';
import { DietaryPreference, DietaryPreferenceEnum } from './diet.entity';

@Controller('dietary-preferences')
export class DietaryPreferenceController {
  constructor(
    private readonly dietaryPreferenceService: DietaryPreferenceService,
  ) {}

  @Post()
  async createDietaryPreferences(
    @Body() createDietaryPreferenceDto: CreateDietaryPreferenceDto,
  ): Promise<DietaryPreference[]> {
    const { preference, userId, explanation } = createDietaryPreferenceDto;
    return this.dietaryPreferenceService.createDietaryPreferences(
      preference,
      userId,
      explanation,
    );
  }

  // Fetch all dietary preferences
  @Get()
  async getAllDietaryPreferences(): Promise<DietaryPreference[]> {
    return this.dietaryPreferenceService.getAllDietaryPreferences();
  }

  // Fetch dietary preferences for a specific user
  @Get('user/:userId')
  async getDietaryPreferencesByUser(
    @Param('userId') userId: number,
  ): Promise<DietaryPreference[]> {
    return this.dietaryPreferenceService.getDietaryPreferencesByUser(userId);
  }

  // Update dietary preference
  @Put(':id')
  async updateDietaryPreference(
    @Param('id') id: number,
    @Body('preference') preference: DietaryPreferenceEnum,
    @Body('explanation') explanation: string,
  ): Promise<DietaryPreference> {
    return this.dietaryPreferenceService.updateDietaryPreference(
      id,
      preference,
      explanation,
    );
  }

  // Delete dietary preference
  @Delete(':id')
  async deleteDietaryPreference(@Param('id') id: number): Promise<void> {
    return this.dietaryPreferenceService.deleteDietaryPreference(id);
  }
}
