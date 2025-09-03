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

  @IsString()
  @IsOptional()
  pastAnestheticHistory?: string;

  @IsString()
  @IsOptional()
  proposedPlan?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsentFileDto)
  consentFileUrl: ConsentFileDto[];

  @IsBoolean()
  clearedForAnesthesiaBool: boolean;

  @IsMongoId()
  doneById: string;
}