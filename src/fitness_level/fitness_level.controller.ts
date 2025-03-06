// // src/fitness-level/fitness-level.controller.ts
// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Put,
//   Delete,
//   Param,
// } from '@nestjs/common';
// import { FitnessLevelService } from './fitness_level.service';
// import { FitnessLevelEnum } from './fitness_level.entity';

// @Controller('fitness-level')
// export class FitnessLevelController {
//   constructor(private readonly fitnessLevelService: FitnessLevelService) {}

//   // Fitness level create karo
//   @Post()
//   async createFitnessLevel(@Body('level') level: FitnessLevelEnum) {
//     return this.fitnessLevelService.createFitnessLevel(level);
//   }

//   // Saare fitness levels fetch karo
//   @Get()
//   async getAllFitnessLevels() {
//     return this.fitnessLevelService.getAllFitnessLevels();
//   }

//   // Fitness level update karo
//   @Put(':id')
//   async updateFitnessLevel(
//     @Param('id') id: number,
//     @Body('level') level: FitnessLevelEnum,
//   ) {
//     return this.fitnessLevelService.updateFitnessLevel(id, level);
//   }

//   // Fitness level delete karo
//   @Delete(':id')
//   async deleteFitnessLevel(@Param('id') id: number) {
//     return this.fitnessLevelService.deleteFitnessLevel(id);
//   }
// }

// src/fitness-level/fitness-level.controller.ts
// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Put,
//   Delete,
//   Param,
// } from '@nestjs/common';
// import { FitnessLevelService } from './fitness_level.service';
// import { FitnessLevelEnum } from './fitness_level.entity';
// import { CreateFitnessLevelDto } from './fitness_level_dto'; // Import DTO

// @Controller('fitness-level')
// export class FitnessLevelController {
//   constructor(private readonly fitnessLevelService: FitnessLevelService) {}

//   // Fitness level create karo
//   @Post()
//   async createFitnessLevel(@Body() createFitnessLevelDto: CreateFitnessLevelDto) {
//     const { level, userId } = createFitnessLevelDto; // Extract level and userId from DTO
//     return this.fitnessLevelService.createFitnessLevel(level, userId);
//   }

//   // Saare fitness levels fetch karo
//   @Get()
//   async getAllFitnessLevels() {
//     return this.fitnessLevelService.getAllFitnessLevels();
//   }

//   // Fitness level update karo
//   @Put(':id')
//   async updateFitnessLevel(
//     @Param('id') id: number,
//     @Body('level') level: FitnessLevelEnum,
//     @Body('userId') userId?: number, // Optional userId for update
//   ) {
//     return this.fitnessLevelService.updateFitnessLevel(id, level, userId);
//   }

//   // Fitness level delete karo
//   @Delete(':id')
//   async deleteFitnessLevel(@Param('id') id: number) {
//     return this.fitnessLevelService.deleteFitnessLevel(id);
//   }
// }

// src/fitness-level/fitness-level.controller.ts
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

  // Fitness level create karo
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

  // Fitness level update karo
  @Put(':id')
  async updateFitnessLevel(
    @Param('id') id: number,
    @Body('level') level: FitnessLevelEnum,
    @Body('userId') userId?: number,
  ) {
    return this.fitnessLevelService.updateFitnessLevel(id, level, userId);
  }

  // Fitness level delete karo
  @Delete(':id')
  async deleteFitnessLevel(@Param('id') id: number) {
    return this.fitnessLevelService.deleteFitnessLevel(id);
  }
}
