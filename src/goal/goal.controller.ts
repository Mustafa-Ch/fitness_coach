import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalType } from './goal.entity';
import { CreateGoalDto } from './goal.dto';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  // Multiple goals create karo
  @Post()
  async createGoals(@Body() createGoalDto: CreateGoalDto) {
    const { types, userId } = createGoalDto;
    return this.goalService.createGoals(types, userId);
  }
  // Saare goals fetch karo
  @Get()
  async getAllGoals() {
    return this.goalService.getAllGoals();
  }

  // Goal update karo
  @Put(':id')
  async updateGoal(
    @Param('id') id: number,
    @Body('type') type: GoalType,
    @Body('userId') userId?: number, // User ID can be optional here if you don't want to change the user
  ) {
    return this.goalService.updateGoal(id, type, userId);
  }

  // Goal delete karo
  @Delete(':id')
  async deleteGoal(@Param('id') id: number) {
    return this.goalService.deleteGoal(id);
  }
}
