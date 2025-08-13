import { PartialType } from '@nestjs/mapped-types';
import { CreateAnesthesiaDto } from './create-anesthesia.dto';

export class UpdateAnesthesiaDto extends PartialType(CreateAnesthesiaDto) {}
