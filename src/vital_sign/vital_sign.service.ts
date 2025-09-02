import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { VitalSign, VitalSignDocument } from './schemas/vital_sign.schema';
import { CreateVitalSignDto } from './dto/create-vital_sign.dto';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Injectable()
export class VitalSignsService {
  constructor(
    @InjectModel(VitalSign.name) private vitalSignModel: Model<VitalSignDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
    private activityLogService: ActivityLogService,
  ) {}

  async create(createVitalSignDto: CreateVitalSignDto): Promise<VitalSign> {
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

    await this.activityLogService.create({
      patient: patient._id,
      action: 'Vital signs taken',
      details: {
        vitalSignId: createdVitalSign._id,
        nurseId: nurse._id,
        measurements: {
          weight: createVitalSignDto.weight,
          height: createVitalSignDto.height,
          bmi
        }
      }
    });

    return createdVitalSign.save();
  }

  async findAll(): Promise<VitalSign[]> {
    return this.vitalSignModel
      .find()
     .populate({
        path: 'vital_signs',
        populate: {
          path: 'nurse'
        }
      })
      .populate('medical_assessments')
      .exec();
  }

  async findOne(id: string): Promise<VitalSign> {
    const vitalSign = await this.vitalSignModel
      .findById(id)
       .populate({
        path: 'vital_signs',
        populate: {
          path: 'nurse',
          select: 'firstName lastName'
        }
      })
      .populate('medical_assessments')
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