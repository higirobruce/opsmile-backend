import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SurgeryRecordService } from './surgery_record.service';
import { CreateSurgeryRecordDto } from './dto/create-surgery_record.dto';
import { UpdateSurgeryRecordDto } from './dto/update-surgery_record.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('surgery-record')
@UseGuards(AuthGuard('jwt'))
export class SurgeryRecordController {
  constructor(private readonly surgeryRecordService: SurgeryRecordService) {}

  @Post()
  create(@Body() createSurgeryRecordDto: CreateSurgeryRecordDto) {
    return this.surgeryRecordService.create(createSurgeryRecordDto);
  }

  @Get()
  findAll() {
    return this.surgeryRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surgeryRecordService.findOne(id);
  }

}
