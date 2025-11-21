import { IsBoolean, IsString } from "class-validator"

export class CreatePatientFileDto {

    @IsString()
    program: string

    @IsString()
    patient: string

    @IsString()
    status: string

    @IsBoolean()
    vitals_taken: boolean

    @IsBoolean()
    consultation_done: boolean

    @IsBoolean()
    anesthesia_done: boolean

    @IsBoolean()
    surgery_done: boolean

    @IsBoolean()
    pacu_done: boolean

    @IsBoolean()
    discharge_done: boolean

    @IsBoolean()
    followUp_done: boolean
}
