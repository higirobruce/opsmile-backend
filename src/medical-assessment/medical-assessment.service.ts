import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalAssessment } from './entities/medical-assessment.entity';
import { CreateMedicalAssessmentDto } from './dto/create-medical-assessment.dto';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MedicalAssessmentService {
  constructor(
    @InjectRepository(MedicalAssessment)
    private medicalAssessmentRepository: Repository<MedicalAssessment>,
    private patientsService: PatientsService,
    private usersService: UsersService,
  ) {}

  async create(createMedicalAssessmentDto: CreateMedicalAssessmentDto): Promise<MedicalAssessment> {
    const patient = await this.patientsService.findOne(createMedicalAssessmentDto.patientId);
    const user = await this.usersService.findOne(createMedicalAssessmentDto.doneById);

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${createMedicalAssessmentDto.patientId} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${createMedicalAssessmentDto.doneById} not found`);
    }

    const assessment = this.medicalAssessmentRepository.create({
      ...createMedicalAssessmentDto,
      patient,
      doneBy: user,
    });

    return this.medicalAssessmentRepository.save(assessment);
  }

  async findAll(): Promise<MedicalAssessment[]> {
    return this.medicalAssessmentRepository.find({
      relations: ['patient', 'doneBy'],
    });
  }

  async findOne(id: string): Promise<MedicalAssessment> {
    const assessment = await this.medicalAssessmentRepository.findOne({
      where: { id },
      relations: ['patient', 'doneBy'],
    });

    if (!assessment) {
      throw new NotFoundException(`Medical assessment with ID ${id} not found`);
    }

    return assessment;
  }

  async findByPatient(patientId: string): Promise<MedicalAssessment[]> {
    return this.medicalAssessmentRepository.find({
      where: { patientId },
      relations: ['patient', 'doneBy'],
      order: { assessment_date: 'DESC' },
    });
  }
}