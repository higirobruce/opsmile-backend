import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    return createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel
      .find()
      .populate({
        path: 'vital_signs',
        populate: {
          path: 'patient'
        },
      })
      .populate({
        path: 'medical_assessments',
        populate: {
          path: 'patient'
        },
      })
      .populate({
        path: 'anesthesia_records',
        populate: {
          path: 'patient'
        },
      })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel
      .findById(id)
      .populate('vital_signs')
      .populate('medical_assessments')
      .populate('anesthesia_records')
      .exec();

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findOneByPhoneNumberOrName(search: string): Promise<Patient[]> {
    const patients = await this.patientModel
      .find({
        $or: [
          { firstName: new RegExp(search, 'i') },
          { lastName: new RegExp(search, 'i') },
          { phoneNumber: new RegExp(search, 'i') },
        ],
      })
      .populate('vital_signs')
      .populate('medical_assessments')
      .exec();

    return patients;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const updatedPatient = await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();

    if (!updatedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return updatedPatient;
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
