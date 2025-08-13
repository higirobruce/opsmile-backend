import { IsEnum, IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';
import { ASAScore, AnesthesiaType, Decision } from '../entities/anesthesia.entity';

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

  @IsString()
  @IsOptional()
  consentFileUrl?: string;

  @IsEnum(Decision)
  decision: Decision;

  @IsString()
  reviewedBy: string;
}