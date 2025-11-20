import { IsMongoId, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProgressDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  patientFile: string;

  @IsMongoId()
  doctorId: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  notes: string;
}
