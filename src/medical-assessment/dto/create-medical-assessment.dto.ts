import { IsMongoId, IsString, IsEnum, IsArray } from 'class-validator';
import { SurgicalDecision } from '../schemas/medical-assessment.schema';

export class CreateMedicalAssessmentDto {
  @IsMongoId()
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
  provisional_diagnosis: string;

  @IsString()
  clinical_notes: string;

  @IsEnum(SurgicalDecision)
  surgical_decision: SurgicalDecision;

  @IsMongoId()
  doneById: string;
}