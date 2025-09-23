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

  @IsString()
  @IsOptional()
  labExams?: string;

  @IsString()
  @IsOptional()
  physicalExams?: string;

  @IsString()
  @IsOptional()
  consultativeNotes?: string;

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


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  @IsOptional()
  uploadedLabExams?: FileDto[];

  @IsBoolean()
  @IsOptional()
  clearedForSurgery?: boolean;

  @IsString()
  @IsOptional()
  surgicalDecision?: string;


  @IsString()
  @IsOptional()
  destinationForTransferred?: string;

  @IsString()
  @IsOptional()
  reasonForPending?: string;
}