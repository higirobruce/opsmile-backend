import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
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
    recommendations: string;

    @IsString()
    nextActions: string;

    @IsString()
    currentStatus: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageFileDto)
    postOperativePictures: ImageFile[];

    @IsMongoId()
    patientId: string;

    @IsMongoId()
    patientFile: string;
}
