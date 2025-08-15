import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anesthesia, AnesthesiaDocument } from './schemas/anesthesia.schema';
import { CreateAnesthesiaDto } from './dto/create-anesthesia.dto';
import { PatientsService } from '../patients/patients.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AnesthesiaService {
  constructor(
    @InjectModel(Anesthesia.name) private anesthesiaModel: Model<AnesthesiaDocument>,
    private patientsService: PatientsService,
    private usersService: UsersService,
  ) {}

  async create(createAnesthesiaDto: CreateAnesthesiaDto): Promise<Anesthesia> {
    const patient = await this.patientsService.findOne(createAnesthesiaDto.patientId);
    const user = await this.usersService.findOne(createAnesthesiaDto.doneById);

    const anesthesia = new this.anesthesiaModel({
      ...createAnesthesiaDto,
      patient: patient._id,
      doneBy: user._id,
    });

    return anesthesia.save();
  }

  async findAll(): Promise<Anesthesia[]> {
    return this.anesthesiaModel
      .find()
      .populate('patient')
      .populate('doneBy')
      .exec();
  }

  async findOne(id: string): Promise<Anesthesia> {
    const anesthesia = await this.anesthesiaModel
      .findById(id)
      .populate('patient')
      .populate('doneBy')
      .exec();

    if (!anesthesia) {
      throw new NotFoundException(`Anesthesia record with ID ${id} not found`);
    }

    return anesthesia;
  }

  async findByPatient(patientId: string): Promise<Anesthesia[]> {
    return this.anesthesiaModel
      .find({ patient: patientId })
      .populate('patient')
      .populate('doneBy')
      .sort({ dateOfReview: -1 })
      .exec();
  }
}