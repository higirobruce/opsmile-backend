import { IsString } from "class-validator";

import { IsNotEmpty } from "class-validator";

export class CreateProvinceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string
}
