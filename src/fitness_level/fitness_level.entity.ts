// // src/fitness-level/fitness-level.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// export enum FitnessLevelEnum {
//   BEGINNER = 'beginner',
//   INTERMEDIATE = 'intermediate',
//   ADVANCED = 'advanced',
// }

// @Entity()
// export class FitnessLevel {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     type: 'enum',
//     enum: FitnessLevelEnum,
//   })
//   level: FitnessLevelEnum;
// }

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

  // Add the userId field to associate the fitness level with a user
  @ManyToOne(() => User, (user) => user.fitnessLevels)
  @JoinColumn({ name: 'userId' }) // Define the column name in the FitnessLevel table
  user: User; // This creates the relationship with the User entity

  @Column() // Explicitly adding userId column for clarity
  userId: number;
}
