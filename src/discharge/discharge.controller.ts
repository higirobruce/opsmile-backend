import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DischargeService } from './discharge.service';
import { CreateDischargeDto } from './dto/create-discharge.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('discharge')
@UseGuards(JwtAuthGuard)
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