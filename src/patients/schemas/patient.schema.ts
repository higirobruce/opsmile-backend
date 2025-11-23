import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Program } from '../../program/schemas/program.schema';
import { Cell } from 'src/cells/entities/cell.entity';
import { Village } from 'src/villages/entities/village.entity';
import { Sector } from 'src/sectors/entities/sector.entity';
import { District } from 'src/districts/schemas/districts.schema';
import { Province } from 'src/provinces/schemas/province.schema';
import { PatientFiles } from 'src/patient-files/schemas/patient-files.schema';

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

  @Prop()
  phoneNumber: string;

  @Prop({ unique: true })
  registrationNumber: number;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Village', required: true })
  village: Village;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cell', required: true })
  cell: Cell;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Sector', required: true })
  sector: Sector;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'District', required: true })
  district: District;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Province', required: true })
  province: Province;

  @Prop()
  nid: string;

  @Prop()
  guardianFirstName?: string;

  @Prop()
  guardianLastName?: string;

  @Prop()
  guardianPhoneNumber?: string;

  @Prop()
  guardianNID?: string;

  @Prop()
  guardianRelationship?: string;

  @Prop()
  guardianDateOfBirth: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Program', required: true })
  program: Program;

  @Prop()
  status: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

// Add virtual for vital signs
PatientSchema.virtual('patient_files', {
  ref: 'PatientFiles',
  localField: '_id',
  foreignField: 'patient',
  justOne: false // Set to false since one patient can have many vital signs
});

// Add compound index for search optimization
PatientSchema.index({ firstName: 'text', lastName: 'text', phoneNumber: 'text' });
