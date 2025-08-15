import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
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

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'VitalSign' }] })
  vital_signs: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'MedicalAssessment' }],
  })
  medical_assessments: MongooseSchema.Types.ObjectId[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
