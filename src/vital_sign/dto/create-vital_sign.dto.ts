import { IsMongoId } from 'class-validator';
import { VitalSignBaseDto } from './vital-sign-base.dto';

export class CreateVitalSignDto extends VitalSignBaseDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
  nurseId: string;
}