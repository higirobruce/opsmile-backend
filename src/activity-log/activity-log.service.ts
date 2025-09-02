import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityLog, ActivityLogDocument } from './schemas/activity-log.schema';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectModel(ActivityLog.name) private activityLogModel: Model<ActivityLogDocument>,
  ) {}

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const createdLog = new this.activityLogModel(createActivityLogDto);
    return createdLog.save();
  }

  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogModel.find().exec();
  }

  async findByPatientId(patientId: string): Promise<ActivityLog[]> {
    return this.activityLogModel.find({ patient: patientId }).sort({ createdAt: 1 }).exec();
  }

  async findOne(id: string): Promise<ActivityLog> {
    return this.activityLogModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.activityLogModel.findByIdAndDelete(id).exec();
  }
}