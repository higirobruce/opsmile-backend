import { PartialType } from '@nestjs/mapped-types';
import { VitalSignBaseDto } from './vital-sign-base.dto';

export class UpdateVitalSignDto extends PartialType(VitalSignBaseDto) {}