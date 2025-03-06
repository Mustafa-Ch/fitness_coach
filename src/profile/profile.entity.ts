// profile.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity'; // Import the User entity

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  profilePicture: string;

  // Establishing a relationship between Profile and User using userId
  @ManyToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' }) // Add userId column in Profile table
  user: User;

  @Column()
  userId: number; // Add the userId column to directly store the user's ID
}
