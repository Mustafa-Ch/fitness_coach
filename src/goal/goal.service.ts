import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Goal } from './goal.entity';
import { GoalType } from './goal.entity';
import { User } from '../auth/user.entity'; // Import User entity

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,

    @InjectRepository(User)
    private userRepository: Repository<User>, // Inject the User repository
  ) {}

  // Multiple goals create karo (with user association)
  async createGoals(types: GoalType[], userId: number): Promise<Goal[]> {
    // Step 1: Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Step 2: Check if goals already exist for the user
    const existingGoals = await this.goalRepository.find({
      where: {
        user, // Ensure we're querying by user
        type: In(types), // Check if any of the selected goal types already exist
      },
    });

    // Step 3: If goals already exist, return them
    if (existingGoals.length > 0) {
      return existingGoals;
    }

    // Step 4: If no existing goals, create new ones
    const goals = types.map((type) =>
      this.goalRepository.create({ type, user }),
    );

    return this.goalRepository.save(goals);
  }
  // Saare goals fetch karo (with user association, if needed)
  async getAllGoals(): Promise<Goal[]> {
    return this.goalRepository.find({ relations: ['user'] }); // Fetch goals with associated user
  }

  // Goal update karo (you can update user if necessary)
  async updateGoal(id: number, type: GoalType, userId?: number): Promise<Goal> {
    const goal = await this.goalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.type = type;

    if (userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      goal.user = user; // You can also change the associated user if needed
    }

    return this.goalRepository.save(goal);
  }

  // Goal delete karo
  async deleteGoal(id: number): Promise<void> {
    const goal = await this.goalRepository.findOne({ where: { id } });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    await this.goalRepository.delete(id);
  }
}
