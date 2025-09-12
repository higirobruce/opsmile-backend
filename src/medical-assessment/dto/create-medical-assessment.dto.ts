import { IsMongoId, IsString, IsArray, IsOptional, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class LabExamDto {
  @IsString()
  testName: string;

  @IsString()
  result: string;
}

class FileDto {
  @IsString()
  name: string;

  @IsString()
  base64Url: string;
}

export class CreateMedicalAssessmentDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  doneById: string;

  @IsString()
  @IsOptional()
  pastMedicalHistory?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabExamDto)
  @IsOptional()
  labExams?: LabExamDto[];

  @IsString()
  diagnosis: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  @IsOptional()
  uploadedFiles?: FileDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  @IsOptional()
  uploadedPhotos?: FileDto[];

  @IsBoolean()
  @IsOptional()
  clearedForSurgery?: boolean;

  @IsString()
  @IsOptional()
  reasonForCancellation?: string;
}