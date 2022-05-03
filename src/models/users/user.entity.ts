import * as bcrypt from 'bcrypt';

import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @BeforeInsert()
    async hashPassword() {
        console.log(`rounds=${process.env.HASH_SALT}; hashing password...`);
        this.password = await bcrypt.hash(
            this.password,
            Number(process.env.HASH_SALT),
        );
        console.log('password hashed...');
    }
    @Column({ select: false })
    password: string;

    @Index()
    @Column({ unique: true })
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: 0, select: false })
    tokenVersion: number;
}
