import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressiveNoteDto } from './create-progressive-note.dto';

export class UpdateProgressiveNoteDto extends PartialType(CreateProgressiveNoteDto) {}
