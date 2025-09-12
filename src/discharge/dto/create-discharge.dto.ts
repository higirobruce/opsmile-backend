import { IsMongoId, IsString, IsDate, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDischargeDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  doctorId: string;

  @IsDate()
  @Type(() => Date)
  dischargeDate: Date;

  @IsString()
  dischargeSummary: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  medicationsAtDischarge?: string[];

  @IsString()
  followUpInstructions: string;
}
