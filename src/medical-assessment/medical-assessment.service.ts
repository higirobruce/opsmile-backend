import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalAssessment, MedicalAssessmentDocument } from './schemas/medical-assessment.schema';
import { CreateMedicalAssessmentDto } from './dto/create-medical-assessment.dto';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { ProgramService } from '../program/program.service';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Injectable()
export class MedicalAssessmentService {
  constructor(
    @InjectModel(MedicalAssessment.name) private medicalAssessmentModel: Model<MedicalAssessmentDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
    private activityLogService: ActivityLogService,
    private programService: ProgramService,
  ) { }

  async create(createMedicalAssessmentDto: CreateMedicalAssessmentDto): Promise<MedicalAssessment> {
    const patient = await this.patientsService.findOne(createMedicalAssessmentDto.patientId);
    const user = await this.usersService.findOne(createMedicalAssessmentDto.doneById);

    const assessment = new this.medicalAssessmentModel({
      ...createMedicalAssessmentDto,
      patient: patient._id,
      doneBy: user._id,
    });

    await this.activityLogService.create({
      patient: patient._id,
      action: 'Medical assessment done',
      details: {
        vitalSignId: assessment._id,
        userId: user._id,
        assessment
      }
    });


    return assessment.save();
  }

  async findAll(): Promise<MedicalAssessment[]> {
    return this.medicalAssessmentModel
      .find()
      .populate('patient')
      .populate('doneBy')
      .exec();
  }

  async findOne(id: string): Promise<MedicalAssessment> {
    const assessment = await this.medicalAssessmentModel
      .findById(id)
      .populate('patient')
      .populate('doneBy')
      .exec();

    if (!assessment) {
      throw new NotFoundException(`Medical assessment with ID ${id} not found`);
    }

    return assessment;
  }

  async findByPatient(patientId: string): Promise<MedicalAssessment[]> {
    return this.medicalAssessmentModel
      .find({ patient: patientId })
      .populate('patient')
      .populate('doneBy')
      .sort({ assessmentDate: -1 })
      .exec();
  }
}