import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { District } from 'src/districts/schemas/districts.schema';
import { Cell } from 'src/cells/entities/cell.entity';
import { Province } from 'src/provinces/schemas/province.schema';
import { User } from 'src/users/entities/user.entity';
import { Sector } from 'src/sectors/entities/sector.entity';
import { Village } from 'src/villages/entities/village.entity';

export type ProgramDocument = Program & Document;

export enum ProgramStatus {
  COMPLETED = 'completed',
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
}

@Schema({ timestamps: true })
export class Program {

  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  location: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Province' })
  province: Province;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'District' })
  district: District;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Sector' })
  sector: Sector;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cell' })
  cell: Cell;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Village' })
  village: Village;

  @Prop({ default: ProgramStatus.ONGOING })
  status: ProgramStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  coordinator: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }], default: [] })
  participants: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Patient' }], default: [] })
  patients: MongooseSchema.Types.ObjectId[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);

// // Add virtual properties for related records
// ProgramSchema.virtual('vital_signs', {
//   ref: 'VitalSign',
//   localField: '_id',
//   foreignField: 'program',
// });

// ProgramSchema.virtual('medical_assessments', {
//   ref: 'MedicalAssessment',
//   localField: '_id',
//   foreignField: 'program',
// });

// ProgramSchema.virtual('anesthesia_records', {
//   ref: 'Anesthesia',
//   localField: '_id',
//   foreignField: 'program',
// });

// ProgramSchema.virtual('surgeries', {
//   ref: 'SurgeryRecord',
//   localField: '_id',
//   foreignField: 'program',
// });

// // Set virtuals to be included in JSON output
// ProgramSchema.set('toJSON', { virtuals: true });
// ProgramSchema.set('toObject', { virtuals: true });