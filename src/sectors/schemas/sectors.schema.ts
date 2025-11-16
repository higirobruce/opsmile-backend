import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { District } from "src/districts/schemas/districts.schema";

export type SectorDocument = Sector & mongoose.Document;

@Schema({timestamps: true})
export class Sector {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'District' })
  district: District;
}

export const SectorSchema = SchemaFactory.createForClass(Sector);
