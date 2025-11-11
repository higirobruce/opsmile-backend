import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DischargeService } from './discharge.service';
import { CreateDischargeDto } from './dto/create-discharge.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('discharge')
@UseGuards(AuthGuard('jwt'))  
export class DischargeController {
  constructor(private readonly dischargeService: DischargeService) {}

  @Post()
  create(@Body() createDischargeDto: CreateDischargeDto) {
    return this.dischargeService.create(createDischargeDto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.dischargeService.findByPatient(patientId);
  }
}