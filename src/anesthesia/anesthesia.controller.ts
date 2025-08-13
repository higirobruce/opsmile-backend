import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AnesthesiaService } from './anesthesia.service';
import { CreateAnesthesiaDto } from './dto/create-anesthesia.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('anesthesia')
// @UseGuards(JwtAuthGuard)
export class AnesthesiaController {
  constructor(private readonly anesthesiaService: AnesthesiaService) {}

  @Post()
  create(@Body() createAnesthesiaDto: CreateAnesthesiaDto) {
    return this.anesthesiaService.create(createAnesthesiaDto);
  }

  @Get()
  findAll() {
    return this.anesthesiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anesthesiaService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.anesthesiaService.findByPatient(patientId);
  }
}