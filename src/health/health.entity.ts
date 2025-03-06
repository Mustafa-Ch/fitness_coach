import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity'; // Make sure the correct path is used for the User entity

@Entity()
export class HealthData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heightFeet: number;

  @Column()
  heightInches: number;

  @Column()
  weight: number;

  @Column()
  age: number;

  // Add the ManyToOne relationship to the User entity
  @ManyToOne(() => User, (user) => user.healthData)
  @JoinColumn({ name: 'userId' }) // Define the column name in the HealthData table
  user: User; // This creates the relationship with the User entity

  @Column() // Explicitly adding userId column for clarity
  userId: number;
}
