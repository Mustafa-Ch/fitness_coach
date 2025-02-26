import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {  // Agar password null/undefined hai, to hash mat karo
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}

