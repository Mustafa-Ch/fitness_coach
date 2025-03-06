// // src/health-data/health-data.controller.ts
// import {
//   Controller,
//   Post,
//   Body,
//   Get,
//   Put,
//   Delete,
//   Param,
// } from '@nestjs/common';
// import { HealthDataService } from './health.service';

// @Controller('health-data')
// export class HealthDataController {
//   constructor(private readonly healthDataService: HealthDataService) {}

//   // Health data create karo
//   @Post()
//   async createHealthData(
//     @Body('heightFeet') heightFeet: number,
//     @Body('heightInches') heightInches: number,
//     @Body('weight') weight: number,
//     @Body('age') age: number,
//   ) {
//     return this.healthDataService.createHealthData(
//       heightFeet,
//       heightInches,
//       weight,
//       age,
//     );
//   }

//   // Saara health data fetch karo
//   @Get()
//   async getAllHealthData() {
//     return this.healthDataService.getAllHealthData();
//   }

//   // Health data update karo
//   @Put(':id')
//   async updateHealthData(
//     @Param('id') id: number,
//     @Body('heightFeet') heightFeet: number,
//     @Body('heightInches') heightInches: number,
//     @Body('weight') weight: number,
//     @Body('age') age: number,
//   ) {
//     return this.healthDataService.updateHealthData(
//       id,
//       heightFeet,
//       heightInches,
//       weight,
//       age,
//     );
//   }

//   // Health data delete karo
//   @Delete(':id')
//   async deleteHealthData(@Param('id') id: number) {
//     return this.healthDataService.deleteHealthData(id);
//   }
// }

// src/health-data/health-data.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { HealthDataService } from './health.service';

@Controller('health-data')
export class HealthDataController {
  constructor(private readonly healthDataService: HealthDataService) {}

  // Health data create karo
  @Post()
  async createHealthData(
    @Body('heightFeet') heightFeet: number,
    @Body('heightInches') heightInches: number,
    @Body('weight') weight: number,
    @Body('age') age: number,
    @Body('userId') userId: number, // Add userId to the request body
  ) {
    return this.healthDataService.createHealthData(
      heightFeet,
      heightInches,
      weight,
      age,
      userId, // Pass userId to service
    );
  }

  // Saara health data fetch karo
  @Get()
  async getAllHealthData() {
    return this.healthDataService.getAllHealthData();
  }

  // Health data update karo
  @Put(':id')
  async updateHealthData(
    @Param('id') id: number,
    @Body('heightFeet') heightFeet: number,
    @Body('heightInches') heightInches: number,
    @Body('weight') weight: number,
    @Body('age') age: number,
    @Body('userId') userId: number, // Add userId to the request body
  ) {
    return this.healthDataService.updateHealthData(
      id,
      heightFeet,
      heightInches,
      weight,
      age,
      userId,
    );
  }

  // Health data delete karo
  @Delete(':id')
  async deleteHealthData(@Param('id') id: number) {
    return this.healthDataService.deleteHealthData(id);
  }
}
