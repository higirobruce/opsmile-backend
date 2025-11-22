import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discharge, DischargeDocument } from './schemas/discharge.schema';
import { CreateDischargeDto } from './dto/create-discharge.dto';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { PatientFilesService } from 'src/patient-files/patient-files.service';

@Injectable()
export class DischargeService {
  constructor(
    @InjectModel(Discharge.name) private dischargeModel: Model<DischargeDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
    private patientFilesService: PatientFilesService,
  ) { }

  async create(createDischargeDto: CreateDischargeDto): Promise<Discharge> {
    const patient = await this.patientsService.findOne(createDischargeDto.patientId);
    const doctor = await this.usersService.findOne(createDischargeDto.doctorId);

    console.log(patient)

    const createdDischarge = new this.dischargeModel({
      ...createDischargeDto,
      patient: patient._id,
      doctor: doctor._id,
      patientFile: createDischargeDto.patientFile
    });

    await this.patientFilesService.update(createDischargeDto.patientFile, { discharge_done: true });
    return createdDischarge.save();
  }

  async findAll(): Promise<Discharge[]> {
    return this.dischargeModel
      .find()
      .populate('patient')
      .populate('doctor')
      .exec();
  }

  async findOne(id: string): Promise<Discharge> {
    const discharge = await this.dischargeModel
      .findById(id)
      .populate('patient')
      .populate('doctor')
      .exec();

    if (!discharge) {
      throw new NotFoundException(`Discharge with ID ${id} not found`);
    }

    return discharge;
  }

  async findByPatient(patientId: string): Promise<Discharge[]> {
    return this.dischargeModel
      .find({ patient: patientId })
      .populate('patient')
      .populate('doctor')
      .sort({ dischargeDate: -1 })
      .exec();
  }
}