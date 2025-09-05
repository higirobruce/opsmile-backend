import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Patient } from '../../patients/schemas/patient.schema';
import { User } from '../../users/schemas/user.schema';
import { ConsentFile } from 'src/anesthesia/schemas/anesthesia.schema';

export enum SurgicalDecision {
  SURGERY = 'surgery',
  NO_SURGERY = 'no_surgery',
  PENDING = 'pending'
}

export enum SampleType {
  BLOOD = 'blood',
  URINE = 'urine',
  SKIN = 'skin',
  NAIL = 'nail',
  TEETH = 'teeth',
  OTHER = 'other'
}

export interface Sample {
  sampleType: SampleType,
  collectionDate: Date,
  status: string
}

export interface LabResult {
  testName: string,
  result: string,
  unit: string,
  referenceRange: string,
  resultDate: Date
}

export interface LabTest {
  name: string,
  status: string,
}

export interface LabRequest {
  status: string;
  tests: LabTest[];
  samples: Sample[];
  results: LabResult[];
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

  @Prop([Object])
  labRequests: LabRequest[];

  @Prop(String)
  @Prop({ required: true })
  diagnosis: string;

  @Prop({ type: [Object] })
  uploadedFiles: ConsentFile[];

  @Prop({ type: [Object] })
  uploadedPhotos: ConsentFile[];

  @Prop({ type: Boolean })
  clearedForSurgery: boolean;

  @Prop({ type: String })
  reasonForCancellation: string
}

export const MedicalAssessmentSchema = SchemaFactory.createForClass(MedicalAssessment);