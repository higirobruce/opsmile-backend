import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSurgeryRecordDto } from './dto/create-surgery_record.dto';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { SurgeryRecord, SurgeryRecordDocument } from './schemas/surgery_record.schema';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Injectable()
export class SurgeryRecordService {
  constructor(
    @InjectModel(SurgeryRecord.name) private surgeryRecordModel: Model<SurgeryRecordDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
    private activityLogService: ActivityLogService,
  ) {}

  async create(createSurgeryDto: CreateSurgeryRecordDto): Promise<SurgeryRecord> {
    const patient = await this.patientsService.findOne(createSurgeryDto.patientId);
    const surgeon = await this.usersService.findOne(createSurgeryDto.surgeonId);
    const anesthesiologist = await this.usersService.findOne(createSurgeryDto.anesthesiologistId);

    const surgery = new this.surgeryRecordModel({
      ...createSurgeryDto,
      patient: patient._id,
      surgeon: surgeon._id,
      anesthesiologist: anesthesiologist._id,
      patientFile: createSurgeryDto.patientFile
    });

    await this.activityLogService.create({
      patient: patient._id,
      action: 'Surgery record taken',
      details: {
        surgeryId: surgery._id,
        surgeonId: surgeon._id,
        anesthesiologistId: anesthesiologist._id,
      }
    });

    return surgery.save();
  }

  async findAll(): Promise<SurgeryRecord[]> {
    return this.surgeryRecordModel
      .find()
      .populate('patient')
      .populate('surgeon')
      .populate('anesthesiologist')
      .populate('assistingSurgeons')
      .populate('nurses')
      .exec();
  }

  async findOne(id: string): Promise<SurgeryRecord> {
    const surgery = await this.surgeryRecordModel
      .findById(id)
      .populate('patient')
      .populate('surgeon')
      .populate('anesthesiologist')
      .populate('assistingSurgeons')
      .populate('nurses')
      .exec();

    if (!surgery) {
      throw new NotFoundException(`Surgery with ID ${id} not found`);
    }

    return surgery;
  }

  async findByPatient(patientId: string): Promise<SurgeryRecord[]> {
    return this.surgeryRecordModel
      .find({ patient: patientId })
      .populate('surgeon')
      .populate('anesthesiologist')
      .populate('assistingSurgeons')
      .populate('nurses')
      .sort({ surgeryDate: -1 })
      .exec();
  }
}