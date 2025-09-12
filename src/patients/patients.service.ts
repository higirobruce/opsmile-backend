import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private readonly activityLogService: ActivityLogService,
  ) { }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    const patient = await createdPatient.save();
    await this.activityLogService.create({
      patient: patient._id,
      action: 'Patient record created',
      details: { firstName: patient.firstName, lastName: patient.lastName },
    });
    return patient;
  }

  async findAll(currentPage: number): Promise<{ patients: Patient[], totalPages: number }> {
    const pageSize = 10;
    const totalPatients = await this.patientModel.countDocuments().exec();
    const totalPages = Math.ceil(totalPatients / pageSize);

    const patients = await this.patientModel
      .find()
      .populate('vital_signs')
      .populate('medical_assessments')
      .populate('anesthesia_records')
      .populate('surgeries')
      .populate('activity_log')
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      patients,
      totalPages,
    }
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel
      .findById(id)
      .populate('vital_signs')
      .populate('medical_assessments')
      .populate('anesthesia_records')
      .populate({
        path: 'surgeries',
        populate: { path: 'surgeon' }, // 👈 populate the surgeon field inside surgeries
      })//populate surgeon
      .exec();

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findOneByPhoneNumberOrName(search: string, currentPage: number): Promise<{ patients: Patient[], totalPages: number }> {
    const pageSize = 5;
    const totalPatients = await this.patientModel.countDocuments({
      $or: [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { phoneNumber: new RegExp(search, 'i') },
      ],
    }).exec();
    const totalPages = Math.ceil(totalPatients / pageSize);

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
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      patients,
      totalPages,
    };
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const updatedPatient = await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();

    if (updatedPatient) {
      await this.activityLogService.create({
        patient: updatedPatient._id,
        action: 'Patient record updated',
        details: { updatedFields: Object.keys(updatePatientDto) },
      });
    }

    if (!updatedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return updatedPatient;
  }

  async remove(id: string): Promise<void> {
    const deletedPatient = await this.patientModel.findByIdAndDelete(id).exec();
    if (deletedPatient) {
      await this.activityLogService.create({
        patient: deletedPatient._id,
        action: 'Patient record deleted',
        details: { firstName: deletedPatient.firstName, lastName: deletedPatient.lastName },
      });
    }
    if (!deletedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
