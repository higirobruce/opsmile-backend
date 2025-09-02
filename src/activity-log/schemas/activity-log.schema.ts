import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ActivityLogDocument = ActivityLog & Document;

@Schema({
  timestamps: true,
  collection: 'activity_logs',
})
export class ActivityLog {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  action: string; // e.g., 'Patient Created', 'Vital Sign Added', 'Medical Assessment Updated'

  @Prop({ type: MongooseSchema.Types.ObjectId, required: false })
  relatedId?: MongooseSchema.Types.ObjectId; // ID of the related document (e.g., VitalSign ID, MedicalAssessment ID)

  @Prop({ type: Object })
  details?: Record<string, any>; // Additional details about the action
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);