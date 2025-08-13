import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';

export enum SurgicalDecision {
  SURGERY = 'surgery',
  NO_SURGERY = 'no_surgery',
  PENDING = 'pending'
}

@Entity('medical_assessments')
export class MedicalAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  // @ManyToOne(() => Patient, (patient) => patient.medicalAssessments)
  // @JoinColumn({ name: 'patientId' })
  // patient: Patient;

  @Column()
  doneById: string;

  @ManyToOne(() => User, { nullable: false })
  doneBy: User;

  @CreateDateColumn()
  assessment_date: Date;

  @Column({ type: 'text' })
  chief_complaint: string;

  @Column('simple-array')
  past_medical_history: string[];

  @Column('simple-array')
  current_medication: string[];

  @Column('simple-array')
  allergies: string[];

  @Column({ type: 'text' })
  provisional_diagnosis: string;

  @Column({ type: 'text' })
  clinical_notes: string;

  @Column({
    type: 'enum',
    enum: SurgicalDecision,
    default: SurgicalDecision.PENDING
  })
  surgical_decision: SurgicalDecision;
}