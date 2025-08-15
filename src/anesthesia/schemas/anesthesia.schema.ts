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

export type AnesthesiaDocument = Anesthesia & Document;

@Schema({ timestamps: true })
export class Anesthesia {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ default: Date.now })
  dateOfReview: Date;

  @Prop({ default: false })
  hasPastAnestheticHistory: boolean;

  @Prop()
  pastAnestheticNotes: string;

  @Prop({ default: false })
  hasKnownComplications: boolean;

  @Prop()
  knownComplicationsNotes: string;

  @Prop({ 
    type: String,
    enum: ASAScore,
    required: true 
  })
  asaScore: ASAScore;

  @Prop({ 
    type: String,
    enum: AnesthesiaType,
    required: true 
  })
  anesthesiaType: AnesthesiaType;

  @Prop({ required: true })
  anesthesiaPlan: string;

  @Prop({ type: [Object] })
  consentFileUrl: ConsentFile[];

  @Prop({ 
    type: String,
    enum: Decision,
    required: true 
  })
  surgical_decision: Decision;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  doneBy: User;
}

export const AnesthesiaSchema = SchemaFactory.createForClass(Anesthesia);