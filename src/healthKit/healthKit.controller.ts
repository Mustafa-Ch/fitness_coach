import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { HealthKitService } from './healthKit.service';
import { CreateHealthKitDto } from './healthKit.dto';
import { HealthKit } from './healthKit.entity';
import { UpdateHealthKitDto } from './healthKit.updateDto';

@Controller('healthkit')
export class HealthKitController {
  constructor(private readonly healthKitService: HealthKitService) {}

  @Post()
  async createHealthData(@Body() createHealthKitDto: CreateHealthKitDto) {
    return this.healthKitService.createHealthData(createHealthKitDto);
  }

  @Put(':id')
  async updateHealthData(
    @Param('id') healthKitId: number,
    @Body() updateHealthKitDto: UpdateHealthKitDto,
  ) {
    return this.healthKitService.updateHealthData(
      healthKitId,
      updateHealthKitDto,
    );
  }

  @Get(':userId')
  async getUserHealthData(
    @Param('userId') userId: number,
  ): Promise<HealthKit[]> {
    return this.healthKitService.getUserHealthData(userId);
  }
}
