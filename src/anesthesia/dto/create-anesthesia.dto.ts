import { IsMongoId, IsEnum, IsString, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ASAScore, AnesthesiaType, Decision } from '../schemas/anesthesia.schema';

class ConsentFileDto {
  @IsString()
  name: string;

  @IsString()
  base64Url: string;
}

export class CreateAnesthesiaDto {
  @IsMongoId()
  patientId: string;

  @IsBoolean()
  hasPastAnestheticHistory: boolean;

  @IsString()
  @IsOptional()
  pastAnestheticNotes?: string;

  @IsBoolean()
  hasKnownComplications: boolean;

  @IsString()
  @IsOptional()
  knownComplicationsNotes?: string;

  @IsEnum(ASAScore)
  asaScore: ASAScore;

  @IsEnum(AnesthesiaType)
  anesthesiaType: AnesthesiaType;

  @IsString()
  anesthesiaPlan: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsentFileDto)
  consentFileUrl: ConsentFileDto[];

  @IsEnum(Decision)
  surgical_decision: Decision;

  @IsMongoId()
  doneById: string;
}