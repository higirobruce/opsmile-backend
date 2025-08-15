import { Exclude, Expose, Transform } from 'class-transformer';
import { VitalSignBaseDto } from './vital-sign-base.dto';

@Exclude()
export class VitalSignResponseDto extends VitalSignBaseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.patient._id.toString())
  patientId: string;

  @Expose()
  @Transform(({ obj }) => obj.nurse._id.toString())
  nurseId: string;

  @Expose()
  assessmentDateTime: Date;

  @Expose()
  bmi: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}