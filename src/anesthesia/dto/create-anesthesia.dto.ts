import { IsMongoId, IsEnum, IsString, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ASAScore, AnesthesiaType, MallampatiScore } from '../schemas/anesthesia.schema';

class ConsentFileDto {
  @IsString()
  name: string;

  @IsString()
  base64Url: string;
}

class MedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;
}

export class CreateAnesthesiaDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  patientFile: string;

  @IsString()
  @IsOptional()
  pastAnestheticHistory?: string;

  @IsEnum(AnesthesiaType)
  @IsOptional()
  anesthesiaType?: AnesthesiaType;

  @IsEnum(ASAScore)
  @IsOptional()
  asaScore?: ASAScore;

  @IsEnum(MallampatiScore)
  @IsOptional()
  mallampatiScore?: MallampatiScore;

  @IsString()
  @IsOptional()
  proposedPlan?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsentFileDto)
  consentFileUrl: ConsentFileDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsentFileDto)
  anesthesiaChecklistUrl: ConsentFileDto[];

  @IsBoolean()
  clearedForAnesthesiaBool: boolean;

  @IsMongoId()
  doneById: string;

  @IsBoolean()
  @IsOptional()
  preanesthesiaChecklistDone?: boolean;

  @IsBoolean()
  @IsOptional()
  surgicalSafetyChecklistDone?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicationDto)
  @IsOptional()
  medications?: MedicationDto[];
}