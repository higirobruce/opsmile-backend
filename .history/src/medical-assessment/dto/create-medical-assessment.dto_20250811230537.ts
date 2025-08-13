import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { SurgicalDecision } from '../entities/medical-assessment.entity';

export class CreateMedicalAssessmentDto {
  @IsUUID()
  patientId: string;

   @IsUUID()
  patient: string;

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
  provisional_diagnosis: string;

  @IsString()
  clinical_notes: string;

  @IsEnum(SurgicalDecision)
  surgical_decision: SurgicalDecision;

  @IsUUID()
  doneById: string;
}