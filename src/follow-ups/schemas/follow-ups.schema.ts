import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { PatientFiles } from 'src/patient-files/schemas/patient-files.schema';
import { Patient } from 'src/patients/entities/patient.entity';
import { ImageFile } from 'src/surgery_record/schemas/surgery_record.schema';

export type FollowUpDocument = FollowUpRecord & Document;

@Schema({ timestamps: true })
export class FollowUpRecord {

    @Prop({ required: true })
    recommendations: string;

    @Prop({ required: true })
    nextActions: string;

    @Prop({ required: true })
    currentStatus: string;

    @Prop([{ type: Object }])
    postOperativePictures: ImageFile[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
    patient: Patient;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PatientFiles', required: true })
    patientFile: PatientFiles;
}

export const FollowUpSchema = SchemaFactory.createForClass(FollowUpRecord);
