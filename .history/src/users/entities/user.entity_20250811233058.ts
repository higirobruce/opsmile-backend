import { MedicalAssessment } from 'src/medical-assessment/entities/medical-assessment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  // Add any additional fields or relations as needed
  // For example, if you want to track medical assessments related to the user:
  @OneToMany(() => MedicalAssessment, (assessment) => assessment.doneBy)
  medicalAssessments: MedicalAssessment[];

}
