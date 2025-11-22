import { Type } from "class-transformer";
import { IsArray, IsDate, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { ImageFile } from "src/surgery_record/schemas/surgery_record.schema";

class ImageFileDto {
    @IsString()
    name: string;

    @IsString()
    base64Url: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class CreateFollowUpDto {
    @IsString()
    nextStep: string;

    @IsString()
    reviewOutcome: string;

    @IsString()
    callOutcome: string;

    @IsDate()
    callDate: Date;

    @IsDate()
    followUpDate: Date;

    @IsMongoId()
    patientId: string;

    @IsMongoId()
    patientFile: string;
}
