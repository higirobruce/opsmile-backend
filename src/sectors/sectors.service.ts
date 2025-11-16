import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sector } from './entities/sector.entity';
import { Model } from 'mongoose';
import { SectorDocument } from './schemas/sectors.schema';

@Injectable()
export class SectorsService {
  constructor(@InjectModel(Sector.name) private sectorModel: Model<SectorDocument>) { }

  async create(createSectorDto: CreateSectorDto) {
    return await this.sectorModel.create(createSectorDto);
  }

  async findAll() {
    return await this.sectorModel
    .find()
    .populate('district')
    .exec();
  }

  async findOne(id: string) {
    return await this.sectorModel.findById(id)
    .populate('district')
    .exec();
  }

  async findByDistrict(districtId: string) {
    return await this.sectorModel.find({ district: districtId })
    .populate('district')
    .exec();
  }

  async update(id: string, updateSectorDto: UpdateSectorDto) {
    return await this.sectorModel.findByIdAndUpdate(id, updateSectorDto, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.sectorModel.findByIdAndDelete(id).exec(); 
  }
}
