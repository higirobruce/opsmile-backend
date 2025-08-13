import { IsEnum, IsString, IsUUID, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { ASAScore, AnesthesiaType, ConsentFile, Decision } from '../entities/anesthesia.entity';
import { Type } from 'class-transformer';

class ConsentFileDto {
  @IsString()
  name: string;

  @IsString()
  base64Url: string;
}
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
  @ValidateNested({ each: true })
  @Type(() => ConsentFileDto)
  consentFileUrl: ConsentFileDto[];

  @IsEnum(Decision)
  decision: Decision;

  @IsString()
  reviewedBy: string;
}