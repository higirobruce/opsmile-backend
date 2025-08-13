import { DefaultValuePipe } from '@nestjs/common';
import { Anesthesia } from 'src/anesthesia/entities/anesthesia.entity';
import { MedicalAssessment } from 'src/medical-assessment/entities/medical-assessment.entity';
import { VitalSign } from 'src/vital_sign/entities/vital_sign.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: 'F' | 'M';

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  countryOfBirth: string;

  @Column()
  status: 'Active' | 'Inactive';

  @OneToMany(() => MedicalAssessment, (assessment) => assessment.patient)
  @JoinColumn({ name: 'patient' })
  medicalAssessments: MedicalAssessment[];

  @OneToMany(() => Anesthesia, (anesthesia) => anesthesia.patient, {
    eager: true,
  })
  @JoinColumn({ name: 'patient' })
  anesthesiaRecords: Anesthesia[];

  @OneToMany(() => VitalSign, (vital) => vital.patient, { eager: true })
  @JoinColumn({ name: 'patient' })
  vital_signs: VitalSign[];
}
