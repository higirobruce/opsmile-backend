import { PartialType } from '@nestjs/mapped-types';
import { CreateSurgeryRecordDto } from './create-surgery_record.dto';

export class UpdateSurgeryRecordDto extends PartialType(CreateSurgeryRecordDto) {}
