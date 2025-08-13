import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: [
      'admin',
      'user',
      'superadmin',
      'registration-clerk',
      'nurse',
      'physician',
      'surgeon',
      'anesthetist',
      'lab-technician',
      'discharge-coordinator',
      'follow-up-nurse',
      'pharmacist',
      'auditor',
      'patient',
    ],
    default: 'user',
  })
  role: string;
}
