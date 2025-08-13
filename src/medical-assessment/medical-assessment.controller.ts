import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalAssessmentService } from './medical-assessment.service';
import { CreateMedicalAssessmentDto } from './dto/create-medical-assessment.dto';
import { UpdateMedicalAssessmentDto } from './dto/update-medical-assessment.dto';

@Controller('medical-assessment')
export class MedicalAssessmentController {
  constructor(private readonly medicalAssessmentService: MedicalAssessmentService) {}

  @Post()
  create(@Body() createMedicalAssessmentDto: CreateMedicalAssessmentDto) {
    return this.medicalAssessmentService.create(createMedicalAssessmentDto);
  }

  @Get()
  findAll() {
    return this.medicalAssessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalAssessmentService.findOne(id);
  }

  @Get('/patient/:id')
  findAllByPatient(@Param('id') id: string) {
    return this.medicalAssessmentService.findByPatient(id);
  }

}
