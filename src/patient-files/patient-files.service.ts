import { Injectable } from '@nestjs/common';
import { CreatePatientFileDto } from './dto/create-patient-file.dto';
import { UpdatePatientFileDto } from './dto/update-patient-file.dto';
import { PatientFiles, PatientFilesDocument } from './schemas/patient-files.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PatientFilesService {

  constructor(
    @InjectModel(PatientFiles.name) private patientFilesModel: Model<PatientFilesDocument>
  ) { }

  async create(createPatientFileDto: CreatePatientFileDto) {
    let newPatientFile = new this.patientFilesModel(createPatientFileDto)
    return await newPatientFile.save()
  }

  async findAll() {
    return await this.patientFilesModel.find()
      .populate({
        path: 'patient',
        select: '_id, firstName, lastName, status, isActive'
      })
      .populate({
        path: 'program',
        populate: {
          path: 'coordinator',
          select: '_id, firstName, lastName, email'
        },
        select: '_id, name, description, status, startDate, endDate'
      })
      // .populate('program')
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
      .populate({
        path: 'discharges',
        populate: [{ path: 'doneBy', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: 'notes',
        populate: [{ path: 'doneBy', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
  }

  async findOne(id: string) {
    return await this.patientFilesModel.findById(id)
      .populate({
        path: 'patient',
        populate: [
          { path: 'province', strictPopulate: false },
          { path: 'district', strictPopulate: false },
          { path: 'sector', strictPopulate: false },
          { path: 'cell', strictPopulate: false },
          { path: 'village', strictPopulate: false },
          { path: 'program', strictPopulate: false, select: 'name code' }
        ],
        select: '_id firstName lastName status isActive registrationNumber dateOfBirth gender nid'
      })
      .populate({
        path: 'program',
        populate: {
          path: 'coordinator',
          select: '_id firstName lastName email'
        },
        select: '_id name description status startDate endDate'
      })
      // .populate('program')
      .populate({
        path: 'vital_signs',
        populate: { path: 'nurse', select: '-password' },
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

      .populate({
        path: 'discharges',
        populate: [{ path: 'doctor', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: 'notes',
        populate: [{ path: 'doneBy', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })

  }

  async findByPatient(id: string) {
    return await this.patientFilesModel.find({ patient: id })
      .populate({
        path: 'patient',
        populate: [
          { path: 'province', strictPopulate: false },
          { path: 'district', strictPopulate: false },
          { path: 'sector', strictPopulate: false },
          { path: 'cell', strictPopulate: false },
          { path: 'village', strictPopulate: false },
          { path: 'program', strictPopulate: false, select: 'name code' }
        ],
        select: '_id firstName lastName status isActive registrationNumber dateOfBirth gender nid'
      })
      .populate({
        path: 'program',
        populate: {
          path: 'coordinator',
          select: '_id firstName lastName email'
        },
        select: '_id name description status startDate endDate'
      })
      // .populate('program')
      .populate({
        path: 'vital_signs',
        populate: { path: 'nurse', select: '-password' },
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
      .populate({
        path: 'discharges',
        populate: [{ path: 'doctor', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: 'notes',
        populate: [{ path: 'doneBy', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
  }

  async findByPatientAndProgram(patient: string, program: string) {
    return await this.patientFilesModel.find({ patient, program })
      .populate({
        path: 'patient',
        // select: '_id, firstName, lastName, status, isActive'
      })
      .populate({
        path: 'program',
        populate: {
          path: 'coordinator',
          select: '_id, firstName, lastName, email'
        },
        select: '_id, name, description, status, startDate, endDate'
      })
      // .populate('program')
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
      .populate({
        path: 'discharges',
        populate: [{ path: 'doctor', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: 'notes',
        populate: [{ path: 'doneBy', select: 'firstName lastName' }],
        options: { sort: { createdAt: -1 } },
      })
  }


  async update(id: string, updatePatientFileDto: UpdatePatientFileDto) {
    return await this.patientFilesModel.findByIdAndUpdate(id, updatePatientFileDto)
  }

  async remove(id: string) {
    return await this.patientFilesModel.findByIdAndDelete(id)
  }
}
