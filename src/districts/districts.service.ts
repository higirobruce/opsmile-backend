import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Model } from 'mongoose';
import { District } from './schemas/districts.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DistrictsService {

  constructor(@InjectModel('District') private readonly districtModel: Model<District>) { }

  async create(createDistrictDto: CreateDistrictDto) {
    const createdDistrict = new this.districtModel(createDistrictDto);
    return createdDistrict.save();
  }

  async findAll() {
    return this.districtModel
    .find()
    .populate('province')
    .exec();
  }

  async findOne(id: number) {
    return this.districtModel
    .findById(id)
    .populate('province')
    .exec();
  }

  async findByProvince(provinceId: string) {
    return this.districtModel
    .find({ province: provinceId })
    .populate('province')
    .exec();
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.districtModel.findByIdAndUpdate(id, updateDistrictDto).exec();
  }

  async remove(id: number) {
    return this.districtModel.findByIdAndDelete(id).exec();
  }
}
