import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientFilesService } from './patient-files.service';
import { CreatePatientFileDto } from './dto/create-patient-file.dto';
import { UpdatePatientFileDto } from './dto/update-patient-file.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('patient-files')
@UseGuards(JwtAuthGuard)
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
