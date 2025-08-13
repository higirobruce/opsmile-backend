import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';

@Entity('vital_signs')
export class VitalSign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { nullable: false })
  patient: Patient;

  @Column()
  patientId: string;

  @Column({ type: 'int' })
  bloodPressureSystolic: number;

  @Column({ type: 'int' })
  bloodPressureDiastolic: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  temperature: number;

  @Column({ type: 'int' })
  pulseRate: number;

  @Column({ type: 'int' })
  respirationRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  oxygenSaturation: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  bmi: number;

  @Column({ type: 'text', nullable: true })
  nursingNotes: string;

  @CreateDateColumn()
  assessmentDateTime: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: false })
  nurse: User;

    @Column()
  nurseId: string;

  @Column('simple-array')
  ownDiagnosis: string[];

  @Column('simple-array')
  healthBarriers: string[];

}