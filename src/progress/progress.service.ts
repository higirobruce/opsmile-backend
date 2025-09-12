import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';
import { CreateProgressDto } from './dto/create-progress.dto';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
  ) {}

  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    const patient = await this.patientsService.findOne(createProgressDto.patientId);
    const doctor = await this.usersService.findOne(createProgressDto.doctorId);

    const createdProgress = new this.progressModel({
      ...createProgressDto,
      patient: patient._id,
      doctor: doctor._id,
    });

    return createdProgress.save();
  }

  async findAll(): Promise<Progress[]> {
    return this.progressModel
      .find()
      .populate('patient')
      .populate('doctor')
      .exec();
  }

  async findOne(id: string): Promise<Progress> {
    const progress = await this.progressModel
      .findById(id)
      .populate('patient')
      .populate('doctor')
      .exec();

    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return progress;
  }

  async findByPatient(patientId: string): Promise<Progress[]> {
    return this.progressModel
      .find({ patient: patientId })
      .populate('patient')
      .populate('doctor')
      .sort({ date: -1 })
      .exec();
  }
}