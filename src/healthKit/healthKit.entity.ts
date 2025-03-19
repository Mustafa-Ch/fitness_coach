import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

export enum HealthDataType {
  STEP_COUNT = 'stepCount',
  HEART_RATE = 'heartRate',
  ACTIVE_ENERGY_BURNED = 'activeEnergyBurned',
}

@Entity()
export class HealthKit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.healthKitRecords)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: HealthDataType,
  })
  type: HealthDataType;

  @Column()
  value: number;

  @Column()
  unit: string;

  @Column()
  timestamp: Date;
}
