import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { PatientFiles } from 'src/patient-files/schemas/patient-files.schema';
import { Patient } from 'src/patients/entities/patient.entity';
import { ImageFile } from 'src/surgery_record/schemas/surgery_record.schema';

export type FollowUpDocument = FollowUpRecord & Document;

@Schema({ timestamps: true })
export class FollowUpRecord {

    nextStep: string;

    @Prop()
    reviewOutcome: string;

    @Prop()
    callOutcome: string;

    @Prop()
    callDate: Date;

    @Prop()
    followUpDate: Date;


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
    patient: Patient;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PatientFiles', required: true })
    patientFile: PatientFiles;
}

export const FollowUpSchema = SchemaFactory.createForClass(FollowUpRecord);
