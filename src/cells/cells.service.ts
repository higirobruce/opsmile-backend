import { Injectable } from '@nestjs/common';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cell } from './entities/cell.entity';
import { CellDocument } from './schemas/cells.schema';
import { Model } from 'mongoose';


@Injectable()
export class CellsService {

  constructor(@InjectModel(Cell.name) private cellModel: Model<CellDocument>) {}  

  async create(createCellDto: CreateCellDto) {    
    return await this.cellModel.create(createCellDto);
  }

  async findAll() {
    return await this.cellModel.find().populate('sector').exec();
  }

  async findOne(id: string) {
    return await this.cellModel.findById(id).populate('sector').exec();
  }

  async findBySector(sectorId: string) {
    return await this.cellModel.find({ sector: sectorId }).exec();
  }

  async update(id: string, updateCellDto: UpdateCellDto) {
    return await this.cellModel.findByIdAndUpdate(id, updateCellDto).exec();
  }

  async remove(id: string) {
    return await this.cellModel.findByIdAndDelete(id).exec();
  }
}
