import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FollowUpsService } from './follow-ups.service';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Controller('follow-ups')
export class FollowUpsController {
  constructor(private readonly followUpsService: FollowUpsService) {}

  @Post()
  create(@Body() createFollowUpDto: CreateFollowUpDto) {
    return this.followUpsService.create(createFollowUpDto);
  }

  @Get()
  findAll() {
    return this.followUpsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followUpsService.findOne(id);
  }

  @Get('/patient/:id')
  findByPatientId(@Param('id') id: string) {
    return this.followUpsService.findByPatientId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowUpDto: UpdateFollowUpDto) {
    return this.followUpsService.update(id, updateFollowUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followUpsService.remove(id);
  }
}
