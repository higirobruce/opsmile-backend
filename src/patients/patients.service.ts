import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { ProgramService } from 'src/program/program.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private readonly activityLogService: ActivityLogService,
    private readonly programService: ProgramService,
  ) { }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { programId, ...rest } = createPatientDto;
    const program = await this.programService.findOne(programId);

    const createdPatient = new this.patientModel({
      ...rest,
      program: program._id,
    });
    const patient = await createdPatient.save();

    await this.programService.addPatientToProgram(programId, patient._id);

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
      .populate('program')
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
      .populate({
        path: 'vital_signs',
        populate: { path: 'nurse' },
        options: { sort: { createdAt: -1 } }, // 👈 populate the recordedBy field inside vital_signs
      })
      .populate({
        path: 'medical_assessments',
        populate: { path: 'doneBy' },
        options: { sort: { createdAt: -1 } }, // 👈 populate the assessor field inside medical_assessments
      })
      .populate({
        path: 'anesthesia_records',
        populate: { path: 'doneBy' },
        options: { sort: { createdAt: -1 } }, // 👈 populate the anesthesiologist field inside anesthesia_records
      })
      .populate({
        path: 'surgeries',
        populate: [{ path: 'surgeon' }, { path: 'anesthesiologist' }],
        options: { sort: { createdAt: -1 } }, // 👈 populate the surgeon and anesthesiologist fields inside surgeries
      })
      .populate('program')
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
    const { programId, ...rest } = updatePatientDto;
    let program;

    if (programId) {
      program = await this.programService.findOne(programId);
    }

    const updatedPatient = await this.patientModel
      .findByIdAndUpdate(id, { ...rest, program: program ? program._id : undefined }, { new: true })
      .exec();

    if (updatedPatient) {
      if (programId) {
        // Remove patient from old program if programId changed
        const oldPatient = await this.patientModel.findById(id).exec();
        if (oldPatient && oldPatient.program && oldPatient.program.toString() !== programId) {
          await this.programService.removePatientFromProgram(oldPatient.program.toString(), id);
        }
        await this.programService.addPatientToProgram(programId, updatedPatient._id);
      }

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
      if (deletedPatient.program) {
        await this.programService.removePatientFromProgram(deletedPatient.program.toString(), id);
      }
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
