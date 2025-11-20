import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { PatientFiles } from 'src/patient-files/schemas/patient-files.schema';

export type ProgressDocument = Progress & Document;

@Schema({ timestamps: true })
export class Progress {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PatientFiles', required: true })
  patientFile: PatientFiles;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  doctor: User;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  notes: string;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
