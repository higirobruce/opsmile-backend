import { Prop } from "@nestjs/mongoose";

export class Province {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;
}
