import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


import mongoose from "mongoose";
import { Sector } from "src/sectors/entities/sector.entity";

export type CellDocument = Cell & mongoose.Document;

@Schema({ timestamps: true })
export class Cell {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true, ref: 'Sector', type: mongoose.Schema.Types.ObjectId })
    sector: Sector
}

export const CellSchema = SchemaFactory.createForClass(Cell);
