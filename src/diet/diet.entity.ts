import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../auth/user.entity'; // Import User entity

// Enum for dietary preferences
export enum DietaryPreferenceEnum {
  NONE = 'None',
  KETO = 'Keto',
  VEGAN = 'Vegan',
  PALEO = 'Paleo',
  OTHER = 'Other',
}

@Entity()
@Unique(['userId', 'preference']) // Ensure user cannot have duplicate preferences
export class DietaryPreference {
  @PrimaryGeneratedColumn()
  id: number;

  // Store the preference as an enum
  @Column({
    type: 'enum',
    enum: DietaryPreferenceEnum,
  })
  preference: DietaryPreferenceEnum;

  // Explanation is optional, store it if provided
  @Column({ nullable: true })
  explanation: string;

  // Many-to-one relation with User (User can have multiple dietary preferences)
  @ManyToOne(() => User, (user) => user.dietaryPreferences)
  @JoinColumn({ name: 'userId' })
  user: User; // Relationship to User entity

  // Store userId for foreign key relationship
  @Column()
  userId: number;
}
