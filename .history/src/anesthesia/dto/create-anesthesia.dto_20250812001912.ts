import { IsEnum, IsString, IsUUID, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ASAScore, AnesthesiaType, ConsentFile, Decision } from '../entities/anesthesia.entity';

export class CreateAnesthesiaDto {
  @IsUUID()
  patientId: string;


  @IsString()
  @IsOptional()
  pastAnestheticNotes?: string;

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