import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Province } from "src/provinces/schemas/province.schema";

export type DistrictDocument = District & Document;

@Schema({ timestamps: true })
export class District {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Province' })
    province: Province;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
