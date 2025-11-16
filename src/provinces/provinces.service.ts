import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Province, ProvinceDocument } from './schemas/province.schema';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(@InjectModel(Province.name) private provinceModel: Model<ProvinceDocument>) { }

  async create(createProvinceDto: CreateProvinceDto) {
    
    return await this.provinceModel.create(createProvinceDto);
  }

  async findAll() {
    return await this.provinceModel.find().exec();
  }

  async findOne(id: string) {
    return await this.provinceModel.findById(id).exec();
  }

  async update(id: string, updateProvinceDto: UpdateProvinceDto) {
    return await this.provinceModel.findByIdAndUpdate(id, updateProvinceDto, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.provinceModel.findByIdAndDelete(id).exec(); 
  }
}
