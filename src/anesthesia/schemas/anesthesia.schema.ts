import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Patient } from '../../patients/schemas/patient.schema';
import { User } from '../../users/schemas/user.schema';

export enum ASAScore {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
  V = 'V',
}

export enum AnesthesiaType {
  GENERAL = 'GENERAL',
  REGIONAL = 'REGIONAL',
  LOCAL = 'LOCAL',
  WALANT = 'WALANT',
  BLOCK = 'BLOCK',
}

export enum Decision {
  PROCEED = 'PROCEED',
  DEFER = 'DEFER',
  CANCEL = 'CANCEL',
}

export interface ConsentFile {
  name: string;
  base64Url: string;
}

export interface Medication {
  name: string;
  dosage: string;
}

export enum MallampatiScore {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
  V = 'V',
}

export type AnesthesiaDocument = Anesthesia & Document;

@Schema({ timestamps: true })
export class Anesthesia {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ default: Date.now })
  dateOfReview: Date;

  @Prop()
  pastAnesteticHistory: string;

  @Prop({ type: String, enum: AnesthesiaType })
  anesthesiaType: AnesthesiaType;

  @Prop({ type: String, enum: ASAScore })
  asaScore: ASAScore;

  @Prop({ type: String, enum: MallampatiScore })
  mallampatiScore: MallampatiScore;

  @Prop()
  proposedPlan: string;

  @Prop()
  clearedForAnesthesiaBool: boolean;

  @Prop({ type: [Object] })
  consentFileUrl: ConsentFile[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  doneBy: User;

  @Prop({ type: Boolean })
  preanesthesiaChecklistDone: boolean;

  @Prop({ type: Boolean })
  surgicalSafetyChecklistDone: boolean;

  @Prop({ type: [Object] })
  medications: Medication[];
}

export const AnesthesiaSchema = SchemaFactory.createForClass(Anesthesia);