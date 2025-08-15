import { IsNumber, IsString, IsMongoId, IsArray, IsOptional, Min, Max } from 'class-validator';

export class VitalSignBaseDto {
  @IsNumber()
  @Min(0)
  @Max(300)
  bloodPressureSystolic: number;

  @IsNumber()
  @Min(0)
  @Max(200)
  bloodPressureDiastolic: number;

  @IsNumber()
  @Min(30)
  @Max(45)
  temperature: number;

  @IsNumber()
  @Min(0)
  @Max(300)
  pulseRate: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  respirationRate: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  oxygenSaturation: number;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsNumber()
  @Min(0)
  height: number;

  @IsOptional()
  @IsString()
  nursingNotes?: string;

  @IsArray()
  @IsString({ each: true })
  ownDiagnosis: string[];

  @IsArray()
  @IsString({ each: true })
  healthBarriers: string[];
}