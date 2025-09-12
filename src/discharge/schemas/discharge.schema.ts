import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';

export type DischargeDocument = Discharge & Document;

@Schema({ timestamps: true })
export class Discharge {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  doctor: User;

  @Prop({ required: true })
  dischargeDate: Date;

  @Prop({ required: true })
  dischargeSummary: string;

  @Prop({ type: [String], default: [] })
  medicationsAtDischarge: string[];

  @Prop({ required: true })
  followUpInstructions: string;
}

export const DischargeSchema = SchemaFactory.createForClass(Discharge);
