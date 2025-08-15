import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Patient } from '../../patients/schemas/patient.schema';
import { User } from '../../users/schemas/user.schema';

export enum SurgicalDecision {
  SURGERY = 'surgery',
  NO_SURGERY = 'no_surgery',
  PENDING = 'pending'
}

export type MedicalAssessmentDocument = MedicalAssessment & Document;

@Schema({ timestamps: true })
export class MedicalAssessment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  doneBy: User;

  @Prop({ default: Date.now })
  assessment_date: Date;

  @Prop({ required: true })
  chief_complaint: string;

  @Prop([String])
  past_medical_history: string[];

  @Prop([String])
  current_medication: string[];

  @Prop([String])
  allergies: string[];

  @Prop({ required: true })
  provisional_diagnosis: string;

  @Prop({ required: true })
  clinical_notes: string;

  @Prop({ 
    type: String, 
    enum: SurgicalDecision,
    default: SurgicalDecision.PENDING 
  })
  surgical_decision: SurgicalDecision;
}

export const MedicalAssessmentSchema = SchemaFactory.createForClass(MedicalAssessment);