import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorsService.create(createSectorDto);
  }

  @Get()
  findAll() {
    return this.sectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorsService.findOne(id);
  }

  @Get('/district/:districtId')
  findByDistrict(@Param('districtId') districtId: string) {
    return this.sectorsService.findByDistrict(districtId);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorsService.update(id, updateSectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorsService.remove(id);
  }
}
