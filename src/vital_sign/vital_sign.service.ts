import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';
import { VitalSign } from './entities/vital_sign.entity';
import { CreateVitalSignDto } from './dto/create-vital_sign.dto';

@Injectable()
export class VitalSignsService {
  constructor(
    @InjectRepository(VitalSign)
    private vitalSignRepository: Repository<VitalSign>,
    private patientsService: PatientsService,
    private usersService: UsersService,
  ) {}

  async create(createVitalSignDto: CreateVitalSignDto): Promise<VitalSign> {
    const patient = await this.patientsService.findOne(createVitalSignDto.patientId);
    const nurse = await this.usersService.findOne(createVitalSignDto.nurseId);

    const bmi = this.calculateBMI(createVitalSignDto.weight, createVitalSignDto.height);

    const vitalSign = this.vitalSignRepository.create({
      ...createVitalSignDto,
      patient,
      nurse,
      bmi,
    });

    return this.vitalSignRepository.save(vitalSign);
  }

  async findAll(): Promise<VitalSign[]> {
    return this.vitalSignRepository.find({
      relations: ['patient', 'nurse'],
    });
  }

  async findOne(id: string): Promise<VitalSign> {
    const vitalSign = await this.vitalSignRepository.findOne({
      where: { id },
      relations: ['patient', 'nurse'],
    });

    if (!vitalSign) {
      throw new NotFoundException(`Vital sign record with ID ${id} not found`);
    }

    return vitalSign;
  }

  async findByPatient(patientId: string): Promise<VitalSign[]> {
    return this.vitalSignRepository.find({
      where: { patient: { id: patientId } },
      relations: ['patient', 'nurse'],
      order: { assessmentDateTime: 'DESC' },
    });
  }

  private calculateBMI(weight: number, height: number): number {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  }
}