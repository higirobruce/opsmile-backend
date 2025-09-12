import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVitalSignDto } from './dto/create-vital_sign.dto';
import { VitalSignsService } from './vital-signs.service';

@Controller('vital_signs')
@UseGuards(JwtAuthGuard)
export class VitalSignsController {
  constructor(private readonly vitalSignsService: VitalSignsService) {}

  @Post()
  create(@Body() createVitalSignDto: CreateVitalSignDto) {
    return this.vitalSignsService.create(createVitalSignDto);
  }

  @Get()
  findAll() {
    return this.vitalSignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitalSignsService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.vitalSignsService.findByPatient(patientId);
  }
}