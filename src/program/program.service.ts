import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Program, ProgramDocument } from './schemas/program.schema';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<ProgramDocument>,
    private usersService: UsersService,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const { coordinatorId, ...programData } = createProgramDto;

    const coordinator = await this.usersService.findOne(coordinatorId);
    if (!coordinator) {
      throw new NotFoundException(`Coordinator with ID ${coordinatorId} not found`);
    }

    const createdProgram = new this.programModel({
      ...programData,
      coordinator: coordinator._id,
    });
    return createdProgram.save();
  }

  async findAll(): Promise<Program[]> {
    return this.programModel
      .find()
      .populate('patients')
      .populate('coordinator')
      .populate('participants')
      .exec();
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programModel
      .findById(id)
      .populate('patients')
      .populate('coordinator')
      .populate('participants')
      .exec();

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return program;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto): Promise<Program> {
    const { coordinatorId, ...updateData } = updateProgramDto;
    const existingProgram = await this.programModel.findById(id).exec();

    if (!existingProgram) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    if (coordinatorId) {
      const coordinator = await this.usersService.findOne(coordinatorId);
      if (!coordinator) {
        throw new NotFoundException(`Coordinator with ID ${coordinatorId} not found`);
      }
      existingProgram.coordinator = coordinator._id;
    }

    Object.assign(existingProgram, updateData);

    const updatedProgram = await existingProgram.save();

    return updatedProgram;
  }

  async remove(id: string): Promise<void> {
    const result = await this.programModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
  }

  async addPatientToProgram(programId: string, patientId: ObjectId): Promise<Program> {
    const program = await this.programModel.findById(programId).exec();
    
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }

    if (!program.patients.includes(patientId)) {
      program.patients.push(patientId);
      return program.save();
    }

    return program;
  }

  async removePatientFromProgram(programId: string, patientId: string): Promise<Program> {
    const program = await this.programModel.findById(programId).exec();
    
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }

    program.patients = program.patients.filter(
      patient => patient.toString() !== patientId
    );
    
    return program.save();
  }
}