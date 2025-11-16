import { Module } from '@nestjs/common';
import { ProgressiveNotesService } from './progressive-notes.service';
import { ProgressiveNotesController } from './progressive-notes.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ProgressiveNotes, ProgressiveNotesSchema } from './schemas/progressive-notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ProgressiveNotesSchema, name: ProgressiveNotes.name }]),
  ],
  controllers: [ProgressiveNotesController],
  providers: [ProgressiveNotesService],
})
export class ProgressiveNotesModule { }
