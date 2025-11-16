import { Injectable } from '@nestjs/common';
import { CreateProgressiveNoteDto } from './dto/create-progressive-note.dto';
import { UpdateProgressiveNoteDto } from './dto/update-progressive-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProgressiveNotes, ProgressiveNotesType } from './schemas/progressive-notes.schema';
import { Model } from 'mongoose';
import { ProgressiveNotesDocument } from './schemas/progressive-notes.schema';

@Injectable()
export class ProgressiveNotesService {

  constructor(
    @InjectModel(ProgressiveNotes.name) private progressiveNotesModel: Model<ProgressiveNotesDocument>) { }

  create(createProgressiveNoteDto: CreateProgressiveNoteDto) {
    return this.progressiveNotesModel.create(createProgressiveNoteDto);
  }

  findAll() {
    return this.progressiveNotesModel.find().exec();
  }

  findByPatientIdByType(patientId: string, type: ProgressiveNotesType) {
    return this.progressiveNotesModel.find({ patient: patientId, type }).exec();
  }

  findOne(id: string) {
    return this.progressiveNotesModel.findById(id).exec();
  }

  update(id: string, updateProgressiveNoteDto: UpdateProgressiveNoteDto) {
    return this.progressiveNotesModel.findByIdAndUpdate(id, updateProgressiveNoteDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.progressiveNotesModel.findByIdAndDelete(id).exec();
  }
}
