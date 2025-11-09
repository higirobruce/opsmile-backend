import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Patient } from '../../patients/schemas/patient.schema';
import { User } from '../../users/schemas/user.schema';
import { ConsentFile } from 'src/anesthesia/schemas/anesthesia.schema';
import { Program } from '../../program/schemas/program.schema';

export enum SurgicalDecision {
  SURGERY = 'surgery',
  NO_SURGERY = 'no_surgery',
  PENDING = 'pending'
}

export interface LabExam {
  testName: string;
  result: string;
}

export type MedicalAssessmentDocument = MedicalAssessment & Document;

@Schema({ timestamps: true })
export class MedicalAssessment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  doneBy: User;
  

  @Prop({ default: Date.now })
  assessmentDate: Date;

  @Prop(String)
  pastMedicalHistory: string;

  @Prop(String)
  labExams: string;


  @Prop(String)
  physicalExams: string;

  @Prop(String)
  consultativeNotes: string;

  @Prop(String)
  @Prop({ required: true })
  diagnosis: string;

  @Prop({ type: [Object] })
  uploadedFiles: ConsentFile[];

  @Prop({ type: [Object] })
  uploadedPhotos: ConsentFile[];

  @Prop({ type: [Object] })
  uploadedLabExams: ConsentFile[];

  @Prop({ type: Boolean })
  clearedForSurgery: boolean;

  @Prop({ type: String })
  reasonForPending: string

  @Prop({ type: String })
  surgicalDecision: SurgicalDecision;

  @Prop({ type: String })
  destinationForTransferred: string
}

export const MedicalAssessmentSchema = SchemaFactory.createForClass(MedicalAssessment);