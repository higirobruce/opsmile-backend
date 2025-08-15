import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { VitalSign, VitalSignDocument } from './schemas/vital_sign.schema';
import { CreateVitalSignDto } from './dto/create-vital_sign.dto';

@Injectable()
export class VitalSignsService {
  constructor(
    @InjectModel(VitalSign.name) private vitalSignModel: Model<VitalSignDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
  ) {}

  async create(createVitalSignDto: CreateVitalSignDto): Promise<VitalSign> {
    console.log('Received createVitalSignDto:', createVitalSignDto);
    const patient = await this.patientsService.findOne(createVitalSignDto.patientId);
    const nurse = await this.usersService.findOne(createVitalSignDto.nurseId);

    const bmi = this.calculateBMI(createVitalSignDto.weight, createVitalSignDto.height);

    const createdVitalSign = new this.vitalSignModel({
      ...createVitalSignDto,
      patient: patient._id,
      nurse: nurse._id,
      bmi,
      assessmentDateTime: new Date(),
    });

    return createdVitalSign.save();
  }

  async findAll(): Promise<VitalSign[]> {
    return this.vitalSignModel
      .find()
      .populate('patient')
      .populate('nurse')
      .exec();
  }

  async findOne(id: string): Promise<VitalSign> {
    const vitalSign = await this.vitalSignModel
      .findById(id)
      .populate('patient')
      .populate('nurse')
      .exec();

    if (!vitalSign) {
      throw new NotFoundException(`Vital sign record with ID ${id} not found`);
    }

    return vitalSign;
  }

  async findByPatient(patientId: string): Promise<VitalSign[]> {
    return this.vitalSignModel
      .find({ patient: patientId })
      .populate('patient')
      .populate('nurse')
      .sort({ assessmentDateTime: -1 })
      .exec();
  }

  private calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  }
}