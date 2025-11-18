import { Injectable } from '@nestjs/common';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { FollowUpRecord, FollowUpDocument } from './schemas/follow-ups.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FollowUpsService {

  constructor(
    @InjectModel(FollowUpRecord.name) private followUpRecordModel: Model<FollowUpDocument>
  ) { }

  create(createFollowUpDto: CreateFollowUpDto) {
    return this.followUpRecordModel.create(
      createFollowUpDto
    )
  }

  findAll() {
    return this.followUpRecordModel.find()
  }

  findOne(id: string) {
    return this.followUpRecordModel.findById(id)
  }

  findByPatientId(id: string) {
    return this.followUpRecordModel.find({ patient: id })
  }

  update(id: string, updateFollowUpDto: UpdateFollowUpDto) {
    return this.followUpRecordModel.findByIdAndUpdate(id, updateFollowUpDto)
  }

  remove(id: string) {
    return this.followUpRecordModel.findByIdAndDelete(id)
  }
}
