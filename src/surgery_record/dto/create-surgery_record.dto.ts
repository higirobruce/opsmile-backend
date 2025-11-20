import { IsMongoId, IsEnum, IsString, IsArray, IsDate, IsNumber, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SurgeryType, SurgeryStatus } from '../schemas/surgery_record.schema';

class ImageFileDto {
  @IsString()
  name: string;

  @IsString()
  base64Url: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateSurgeryRecordDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  patientFile: string;

  @IsMongoId()
  surgeonId: string;

  @IsMongoId()
  anesthesiologistId: string;

  @IsDate()
  @Type(() => Date)
  surgeryDate: Date;

  @IsDate()
  @Type(() => Date)
  surgeryEndDate: Date;

  @IsEnum(SurgeryType)
  surgeryType: SurgeryType;

  @IsString()
  procedure: string;

  @IsString()
  @IsOptional()
  observers: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageFileDto)
  consentFileUrls: ImageFileDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageFileDto)
  beforeSurgeryImageUrls: ImageFileDto[];

  @IsNumber()
  estimatedDuration: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  assistingSurgeons?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  nurses?: string[];
}