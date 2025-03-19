import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { FitnessLevelService } from './fitness_level.service';
import { FitnessLevelEnum } from './fitness_level.entity';
import { CreateFitnessLevelDto } from '../fitness_level/fitness_level_dto'; // Import DTO

@Controller('fitness-level')
export class FitnessLevelController {
  constructor(private readonly fitnessLevelService: FitnessLevelService) {}

  @Post()
  async createFitnessLevel(
    @Body() createFitnessLevelDto: CreateFitnessLevelDto,
  ) {
    const { level, userId } = createFitnessLevelDto;
    return this.fitnessLevelService.createFitnessLevel(level, userId);
  }

  @Get()
  async getAllFitnessLevels() {
    return this.fitnessLevelService.getAllFitnessLevels();
  }

  @Put(':id')
  async updateFitnessLevel(
    @Param('id') id: number,
    @Body('level') level: FitnessLevelEnum,
    @Body('userId') userId?: number,
  ) {
    return this.fitnessLevelService.updateFitnessLevel(id, level, userId);
  }

  @Delete(':id')
  async deleteFitnessLevel(@Param('id') id: number) {
    return this.fitnessLevelService.deleteFitnessLevel(id);
  }
}
