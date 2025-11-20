import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientFilesService } from './patient-files.service';
import { CreatePatientFileDto } from './dto/create-patient-file.dto';
import { UpdatePatientFileDto } from './dto/update-patient-file.dto';

@Controller('patient-files')
export class PatientFilesController {
  constructor(private readonly patientFilesService: PatientFilesService) { }

  @Post()
  create(@Body() createPatientFileDto: CreatePatientFileDto) {
    return this.patientFilesService.create(createPatientFileDto);
  }

  @Get()
  findAll() {
    return this.patientFilesService.findAll();
  }

  @Get('/patient/:id')
  findByPatient(@Param('id') id: string) {
    return this.patientFilesService.findByPatient(id)
  }

  @Get('/patient/:patient/program/:program')
  findByPatientAndProgram(@Param('patient') patient: string, @Param('program') program: string) {
    return this.patientFilesService.findByPatientAndProgram(patient, program)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientFilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientFileDto: UpdatePatientFileDto) {
    return this.patientFilesService.update(id, updatePatientFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientFilesService.remove(id);
  }
}
