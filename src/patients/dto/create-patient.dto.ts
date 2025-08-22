// filepath: /Users/brucehigiro/Documents/development/cleft/backend/cleft-backend/src/patients/dto/create-patient.dto.ts
import { IsString, IsOptional, IsDate } from 'class-validator';
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
}