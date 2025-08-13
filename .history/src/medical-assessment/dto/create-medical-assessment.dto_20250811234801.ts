import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { SurgicalDecision } from '../entities/medical-assessment.entity';
import { ManyToOne } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';

export class CreateMedicalAssessmentDto {
  @ManyToOne(() => Patient, (patient) => patient.medical_assessments)
  @IsUUID()
  patientId: string;

  @IsString()
  chief_complaint: string;

  @IsArray()
  @IsString({ each: true })
  past_medical_history: string[];

  @IsArray()
  @IsString({ each: true })
  current_medication: string[];

  @IsArray()
  @IsString({ each: true })
  allergies: string[];

  @IsString()
  provisional_diagnosis: string[];

  @IsArray()
  @IsString({ each: true })
  clinical_notes: string;

  @IsEnum(SurgicalDecision)
  surgical_decision: SurgicalDecision;

  @IsUUID()
  doneById: string;
}
