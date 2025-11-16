import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Cell } from "src/cells/entities/cell.entity";

export type VillageDocument = Village & Document;

@Schema({ timestamps: true })
export class Village {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Cell' })
    cell: Cell;
}

export const VillageSchema = SchemaFactory.createForClass(Village);