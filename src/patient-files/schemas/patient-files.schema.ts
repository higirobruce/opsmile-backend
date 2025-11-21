import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Program } from '../../program/schemas/program.schema';
import { Patient } from 'src/patients/schemas/patient.schema';

export type PatientFilesDocument = PatientFiles & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

export class PatientFiles {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Program', required: true })
  program: Program;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: Patient;

  @Prop({default: 'in vitals'})
  status: string;

  @Prop({default: false})
  vitals_taken: boolean

  @Prop({default: false})
  consultation_done: boolean

  @Prop({default: false})
  anesthesia_done: boolean

  @Prop({default: false})
  surgery_done: boolean

  @Prop({default: false})
  pacu_done: boolean

  @Prop({default: false})
  discharge_done: boolean

  @Prop({default: false})
  followUp_done: boolean

}

export const PatientFilesSchema = SchemaFactory.createForClass(PatientFiles);

// Add virtual for vital signs
PatientFilesSchema.virtual('vital_signs', {
  ref: 'VitalSign',
  localField: '_id',
  foreignField: 'patientFile',
  justOne: false // Set to false since one patient can have many vital signs
});

// Add virtual for medical assessments
PatientFilesSchema.virtual('medical_assessments', {
  ref: 'MedicalAssessment',
  localField: '_id',
  foreignField: 'patientFile',
  justOne: false
});

// Add virtual for medical assessments
PatientFilesSchema.virtual('anesthesia_records', {
  ref: 'Anesthesia',
  localField: '_id',
  foreignField: 'patientFile',
  justOne: false
});

PatientFilesSchema.virtual('surgeries', {
  ref: 'SurgeryRecord',
  localField: '_id',
  foreignField: 'patientFile',
  justOne: false
});

PatientFilesSchema.virtual('discharges', {
  ref: 'Discharge',
  localField: '_id',
  foreignField: 'patientFile',
  justOne: false
});

// Add compound index for search optimization
// PatientFilesSchema.index({ patient: 'text', lastName: 'text', phoneNumber: 'text' });
