import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anesthesia } from './entities/anesthesia.entity';
import { CreateAnesthesiaDto } from './dto/create-anesthesia.dto';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class AnesthesiaService {
  constructor(
    @InjectRepository(Anesthesia)
    private anesthesiaRepository: Repository<Anesthesia>,
    private patientsService: PatientsService,
  ) {}

  async create(createAnesthesiaDto: CreateAnesthesiaDto): Promise<Anesthesia> {
    const patient = await this.patientsService.findOne(createAnesthesiaDto.patientId);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${createAnesthesiaDto.patientId} not found`);
    }

    const anesthesia = this.anesthesiaRepository.create({
      ...createAnesthesiaDto,
      patient,
    });

    return this.anesthesiaRepository.save(anesthesia);
  }

  async findAll(): Promise<Anesthesia[]> {
    return this.anesthesiaRepository.find({ relations: ['patient'] });
  }

  async findOne(id: string): Promise<Anesthesia> {
    const anesthesia = await this.anesthesiaRepository.findOne({ 
      where: { id },
      relations: ['patient']
    });
    if (!anesthesia) {
      throw new NotFoundException(`Anesthesia record with ID ${id} not found`);
    }
    return anesthesia;
  }

  async findByPatient(patientId: string): Promise<Anesthesia[]> {
    return this.anesthesiaRepository.find({
      where: { patient: { id: patientId } },
      relations: ['patient'],
    });
  }
}