import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { PatientFiles } from 'src/patient-files/schemas/patient-files.schema';

export type DischargeDocument = Discharge & Document;

@Schema({ timestamps: true })
export class Discharge {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PatientFiles', required: true })
  patientFile: PatientFiles;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  doctor: User;

  @Prop({ required: true })
  dischargeDate: Date;


  @Prop({ type: [String], default: [] })
  medicationsAtDischarge: string[];

  @Prop()
  followUpInstructions: string;

  @Prop()
  followUpAction: string;

  @Prop({ required: true })
  diagnosis: string;

  @Prop({ required: true })
  procedure: string;

  @Prop({ required: true })
  patientDisposition: string

  @Prop()
  reviewDate: Date;

  @Prop()
  reviewLocation: string;

  @Prop()
  referralDate: Date;

  @Prop()
  reeferralLocation: string;

  @Prop()
  isFollowUp: boolean;

  @Prop()
  followUpDate: Date

  @Prop()
  followUpDuration: number

}

export const DischargeSchema = SchemaFactory.createForClass(Discharge);
