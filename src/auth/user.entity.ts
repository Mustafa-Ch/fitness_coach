// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Goal } from '../goal/goal.entity'; // Import the Goal entity
import { FitnessLevel } from '../fitness_level/fitness_level.entity'; // Import the FitnessLevel entity
import { HealthData } from '../health/health.entity'; // Import the HealthData entity
import { Profile } from '../profile/profile.entity'; // Import Profile entity

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'text', nullable: true })
  verificationToken: string | null;

  // New Profile Fields
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  profilePicture: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // OneToMany relationship with Goal entity (a user can have many goals)
  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];

  @OneToMany(() => FitnessLevel, (fitnessLevel) => fitnessLevel.user)
  fitnessLevels: FitnessLevel[];

  @OneToMany(() => HealthData, (healthData) => healthData.user)
  healthData: HealthData[];

  // OneToOne relationship with Profile (a user can have one profile)
  @OneToMany(() => Profile, (profile) => profile.user)
  profile: Profile[];
}
