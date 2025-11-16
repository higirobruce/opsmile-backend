import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressiveNotesService } from './progressive-notes.service';
import { CreateProgressiveNoteDto } from './dto/create-progressive-note.dto';
import { UpdateProgressiveNoteDto } from './dto/update-progressive-note.dto';
import { ProgressiveNotesType } from './schemas/progressive-notes.schema';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('progressive-notes')
export class ProgressiveNotesController {
  constructor(private readonly progressiveNotesService: ProgressiveNotesService) { }

  @Post()
  create(
    
    @Body() createProgressiveNoteDto: CreateProgressiveNoteDto) {
    return this.progressiveNotesService.create(createProgressiveNoteDto);
  }

  @Get()
  findAll() {
    return this.progressiveNotesService.findAll();
  }

  @Get('patient/:patientId/type/:type')
  findByPatientIdByType(@Param('patientId') patientId: string, @Param('type') type: ProgressiveNotesType) {
    return this.progressiveNotesService.findByPatientIdByType(patientId, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressiveNotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressiveNoteDto: UpdateProgressiveNoteDto) {
    return this.progressiveNotesService.update(id, updateProgressiveNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressiveNotesService.remove(id);
  }
}
