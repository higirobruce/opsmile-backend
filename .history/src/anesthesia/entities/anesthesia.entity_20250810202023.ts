import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

export enum ASAScore {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
  V = 'V'
}

export enum AnesthesiaType {
  GENERAL = 'GENERAL',
  REGIONAL = 'REGIONAL',
  LOCAL = 'LOCAL'
}

export enum Decision {
  PROCEED = 'PROCEED',
  DEFER = 'DEFER',
  CANCEL = 'CANCEL'
}

@Entity()
export class Anesthesia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { nullable: false })
  patient: Patient;

  @CreateDateColumn()
  dateOfReview: Date;

  @Column({ type: 'boolean', default: false })
  hasPastAnestheticHistory: boolean;

  @Column({ type: 'text', nullable: true })
  pastAnestheticNotes: string;

  @Column({ type: 'boolean', default: false })
  hasKnownComplications: boolean;

  @Column({ type: 'text', nullable: true })
  knownComplicationsNotes: string;

  @Column({ type: 'enum', enum: ASAScore })
  asaScore: ASAScore;

  @Column({ type: 'enum', enum: AnesthesiaType })
  anesthesiaType: AnesthesiaType;

  @Column({ type: 'text' })
  anesthesiaPlan: string;

  @Column({ type: 'text', nullable: true })
  consentFileUrl: string;

  @Column({ type: 'enum', enum: Decision })
  decision: Decision;

  @Column()
  reviewedBy: string;
}