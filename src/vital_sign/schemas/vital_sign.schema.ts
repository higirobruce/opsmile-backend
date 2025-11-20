import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from 'src/users/entities/user.entity';
import { PatientFiles } from 'src/patient-files/schemas/patient-files.schema';

export type VitalSignDocument = VitalSign & Document;

@Schema({ timestamps: true })
export class VitalSign {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PatientFiles', required: true })
  patientFile: PatientFiles;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  nurse: User;

  @Prop({ required: true })
  bloodPressureSystolic: number;

  @Prop({ required: true })
  bloodPressureDiastolic: number;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  pulseRate: number;

  @Prop({ required: true })
  respirationRate: number;

  @Prop({ required: true })
  oxygenSaturation: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  bmi: number;

  @Prop()
  assessmentDateTime: Date;
}

export const VitalSignSchema = SchemaFactory.createForClass(VitalSign);