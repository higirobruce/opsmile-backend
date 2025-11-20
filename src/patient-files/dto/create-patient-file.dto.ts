import { IsString } from "class-validator"

export class CreatePatientFileDto {

    @IsString()
    program: string

    @IsString()
    patient: string

    @IsString()
    status: string
}
