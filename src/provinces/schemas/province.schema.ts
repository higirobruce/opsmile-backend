import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProvinceDocument = Province & Document;

@Schema({ timestamps: true })
export class Province {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);