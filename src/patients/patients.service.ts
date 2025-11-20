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

    const lastPatient = await this.patientModel.findOne().sort({ registrationNumber: -1 }).exec();
    const newRegistrationNumber = lastPatient && lastPatient.registrationNumber ? lastPatient.registrationNumber + 1 : 10000;

    const createdPatient = new this.patientModel({
      ...rest,
      program: program._id,
      registrationNumber: newRegistrationNumber,
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
      .populate('patient_files')

      .sort({ createdAt: -1 })
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
        path: 'program',
        select: '_id name description'
      })
      .populate('province')
      .populate('district')
      .populate('cell')
      .populate(
        {
          path: 'patient_files',
          populate: [
            {
              path:'program',
              select: '_id name description status createdAt'
            }
          ]
        }

      )
      .exec();

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findOneByPhoneNumberOrName(search: string, currentPage: number, pageSize: number): Promise<{ patients: Patient[], totalPages: number, totalCount: number }> {
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
      .sort({ createdAt: -1 })
      .populate({
        path: 'program',
        select: '_id name description startDate endDate status '
      })
      .populate('province')
      .populate('district')
      .populate('cell')
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      patients,
      totalPages,
      totalCount: totalPatients,
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
