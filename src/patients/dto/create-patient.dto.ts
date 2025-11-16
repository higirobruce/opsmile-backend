// filepath: /Users/brucehigiro/Documents/development/cleft/backend/cleft-backend/src/patients/dto/create-patient.dto.ts
import { IsString, IsOptional, IsDate, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsMongoId()
  @IsOptional()
  cell: string;

  @IsMongoId()
  @IsOptional()
  sector: string;

  @IsMongoId()
  @IsOptional()
  district: string;

  @IsMongoId()
  @IsOptional()
  province: string;

  @IsString()
  @IsOptional()
  nid?: string;

  @IsString()
  @IsOptional()
  guardianFirstName?: string;

  @IsString()
  @IsOptional()
  guardianLastName?: string;

  @IsString()
  @IsOptional()
  guardianPhoneNumber?: string;

  @IsString()
  @IsOptional()
  guardianNID?: string;

  @IsString()
  @IsOptional()
  guardianRelationship?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  guardianDateOfBirth?: Date;

  @IsMongoId()
  programId: string;
}