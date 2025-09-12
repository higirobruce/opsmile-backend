import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Patient } from '../../patients/schemas/patient.schema';
import { User } from '../../users/schemas/user.schema';

export enum SurgeryType {
  CLEFT_LIP = 'CLEFT_LIP',
  CLEFT_PALATE = 'CLEFT_PALATE',
  ALVEOLAR_BONE_GRAFT = 'ALVEOLAR_BONE_GRAFT',
  REVISION = 'REVISION'
}

export enum SurgeryStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ImageFile {
  name: string;
  base64Url: string;
  description?: string;
}

@Schema({ timestamps: true })
export class SurgeryRecord {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  surgeon: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  anesthesiologist: User;

  @Prop({ required: true })
  surgeryDate: Date;

  @Prop({
    type: String,
    enum: SurgeryType,
    required: true
  })
  surgeryType: SurgeryType;

  @Prop({
    type: String,
    enum: SurgeryStatus,
    default: SurgeryStatus.SCHEDULED
  })
  status: SurgeryStatus;

  @Prop({ required: true })
  procedure: string;

  @Prop([{ type: Object }])
  consentFileUrls: ImageFile[];

  @Prop([{ type: Object }])
  beforeSurgeryImageUrls: ImageFile[];

  @Prop([{ type: Object }])
  afterSurgeryImageUrls: ImageFile[];

  @Prop()
  estimatedDuration: number; // in minutes

  @Prop()
  actualDuration: number; // in minutes

  @Prop()
  complications: string[];

  @Prop()
  surgicalNotes: string;

  @Prop()
  postOperativeInstructions: string;

  @Prop()
  followUpDate: Date;

  @Prop({ default: false })
  isRevisionNeeded: boolean;

  @Prop()
  revisionReason: string;

  @Prop([String])
  medications: string[];

  @Prop()
  bloodLoss: number; // in ml

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  assistingSurgeons: User[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  nurses: User[];
}

export type SurgeryRecordDocument = SurgeryRecord & Document;
export const SurgeryRecordSchema = SchemaFactory.createForClass(SurgeryRecord);