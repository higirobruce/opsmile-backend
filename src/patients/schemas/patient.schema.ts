import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Patient {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  sex: string;

  @Prop()
  address: string;

  @Prop()
  guardian: string;

  @Prop()
  guardianContact: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

// Add virtual for vital signs
PatientSchema.virtual('vital_signs', {
  ref: 'VitalSign',
  localField: '_id',
  foreignField: 'patient',
  justOne: false // Set to false since one patient can have many vital signs
});

// Add virtual for medical assessments
PatientSchema.virtual('medical_assessments', {
  ref: 'MedicalAssessment',
  localField: '_id',
  foreignField: 'patient',
  justOne: false
});

// Add virtual for medical assessments
PatientSchema.virtual('anesthesia_records', {
  ref: 'Anesthesia',
  localField: '_id',
  foreignField: 'patient',
  justOne: false
});

// Add compound index for search optimization
PatientSchema.index({ firstName: 'text', lastName: 'text', phoneNumber: 'text' });
