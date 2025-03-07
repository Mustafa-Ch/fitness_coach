import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity'; // Assuming your user entity is in the auth module

export enum GoalType {
  OPTIMIZE_GENERAL_HEALTH = 'Optimize General Health',
  OPTIMIZE_FITNESS = 'Optimize Fitness',
  OPTIMIZE_NUTRITION = 'Optimize Nutrition',
  IMPROVE_RECOVERY = 'Improve Recovery',
  MANAGE_STRESS = 'Manage Stress',
  ELEVATE_YOUR_LIFE = 'Elevate Your Life',
}

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: GoalType,
  })
  type: GoalType;

  // Add the userId field to associate the goal with a user
  @ManyToOne(() => User, (user) => user.goals)
  @JoinColumn({ name: 'userId' }) // Define the column name in the Goal table
  user: User; // This creates the relationship with the User entity

  @Column() // Explicitly adding userId column for clarity
  userId: number;
}
