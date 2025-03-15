// src/file-upload/entities/uploaded-file.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class UploadedFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  fileUrl: string;

  @Column()
  fileType: string;

  @ManyToOne(() => User, (user) => user.files)
  user: User;
}
