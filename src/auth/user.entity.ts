// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Goal } from '../goal/goal.entity'; // Import the Goal entity
import { FitnessLevel } from '../fitness_level/fitness_level.entity'; // Import the FitnessLevel entity
import { HealthData } from '../health/health.entity'; // Import the HealthData entity
import { Profile } from '../profile/profile.entity'; // Import Profile entity
import { DietaryPreference } from '../diet/diet.entity';

import { UploadedFile } from 'src/files/uploaded-file.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'text', nullable: true })
  verificationToken: string | null;

  @Column({ type: 'text', nullable: true })
  accessToken: string | null;

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

  @OneToMany(
    () => DietaryPreference,
    (dietaryPreference) => dietaryPreference.user,
  )
  dietaryPreferences: DietaryPreference[];

  @OneToMany(() => UploadedFile, (file) => file.user)
  files: UploadedFile[];
}
