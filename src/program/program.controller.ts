import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ObjectId } from 'mongoose';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }

  @Get()
  findAll() {
    return this.programService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programService.remove(id);
  }

  @Post(':id/patients/:patientId')
  addPatient(@Param('id') id: string, @Param('patientId') patientId: ObjectId) {
    return this.programService.addPatientToProgram(id, patientId);
  }

  @Delete(':id/patients/:patientId')
  removePatient(@Param('id') id: string, @Param('patientId') patientId: string) {
    return this.programService.removePatientFromProgram(id, patientId);
  }
}