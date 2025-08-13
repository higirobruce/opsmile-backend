import { IsEnum, IsString, IsUUID, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ASAScore, AnesthesiaType, ConsentFile, Decision } from '../entities/anesthesia.entity';

export class CreateAnesthesiaDto {
  @IsUUID()
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
  @IsOptional()
  consentFileUrl?: ConsentFile[];

  @IsEnum(Decision)
  decision: Decision;

  @IsString()
  reviewedBy: string;
}