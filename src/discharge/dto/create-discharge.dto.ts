import { IsMongoId, IsString, IsDate, IsArray, IsOptional, IsBoolean, IsNumber } from 'class-validator';
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

  @IsString()
  diagnosis: string;

  @IsString()
  procedure: string;

  @IsString()
  patientDisposition: string

  @IsDate()
  reviewDate: Date;

  @IsBoolean()
  isFollowUp: boolean;

  @IsDate()
  followUpDate: Date

  @IsNumber()
  followUpDuration: number
}
