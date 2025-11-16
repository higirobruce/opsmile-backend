import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Patient } from "src/patients/entities/patient.entity";
import { User } from "src/users/entities/user.entity";

export type ProgressiveNotesDocument = ProgressiveNotes & Document;

export enum ProgressiveNotesType {
    ANESTHESIA_NOTES = "ANESTHESIA_NOTES",
}

@Schema({ timestamps: true })
export class ProgressiveNotes {
    @Prop()
    notes: string;

    @Prop()
    title: string;

    @Prop({ enum: ProgressiveNotesType })
    type: ProgressiveNotesType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
    patient: Patient;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    doneBy: User;

    @Prop({ type: Date, default: Date.now })
    notesDate: Date;
}

export const ProgressiveNotesSchema = SchemaFactory.createForClass(ProgressiveNotes);