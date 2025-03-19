import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity'; // Import User entity

export enum FitnessLevelEnum {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity()
export class FitnessLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: FitnessLevelEnum,
  })
  level: FitnessLevelEnum;

  @ManyToOne(() => User, (user) => user.fitnessLevels)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
