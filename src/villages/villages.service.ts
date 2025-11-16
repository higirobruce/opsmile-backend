import { Injectable } from '@nestjs/common';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Village } from './entities/village.entity';
import { Model } from 'mongoose';
import { VillageDocument } from './schema/villages.schema';

@Injectable()
export class VillagesService {

  constructor(@InjectModel(Village.name) private villageModel: Model<VillageDocument>) {}

  async create(createVillageDto: CreateVillageDto) {
    return await this.villageModel.create(createVillageDto);
  }

  async findAll() {
    return await this.villageModel.find().exec();
  }

  async findOne(id: number) {
    return await this.villageModel.findById(id).exec();
  }

  async findByCellId(cellId: string) {
    return await this.villageModel.find({ cell: cellId }).exec();
  }

  async update(id: number, updateVillageDto: UpdateVillageDto) {
    return await this.villageModel.findByIdAndUpdate(id, updateVillageDto, { new: true }).exec();
  }

  async remove(id: number) {
    return await this.villageModel.findByIdAndDelete(id).exec();
  }
}
