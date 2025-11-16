import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Program, ProgramDocument, ProgramStatus } from './schemas/program.schema';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { UsersService } from 'src/users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<ProgramDocument>,
    private usersService: UsersService,
  ) {}

  private calculateProgramStatus(startDate?: Date, endDate?: Date): ProgramStatus {
    const now = new Date();
    if (startDate && now < new Date(startDate)) {
      return ProgramStatus.UPCOMING;
    }
    if (endDate && now > new Date(endDate)) {
      return ProgramStatus.COMPLETED;
    }
    return ProgramStatus.ONGOING;
  }

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const { coordinatorId, startDate, endDate, ...programData } = createProgramDto;

    const coordinator = await this.usersService.findOne(coordinatorId);
    if (!coordinator) {
      throw new NotFoundException(`Coordinator with ID ${coordinatorId} not found`);
    }

    const status = this.calculateProgramStatus(startDate, endDate);

    const createdProgram = new this.programModel({
      ...programData,
      startDate,
      endDate,
      coordinator: coordinator._id,
      status,
    });
    return createdProgram.save();
  }

  async findAll(): Promise<Program[]> {
    return this.programModel
      .find()
      .sort({ startDate: -1 })
      .populate('patients')
      .populate('coordinator')
      .populate('participants')
      .populate('province')
      .populate('district')
      .populate('sector')
      .populate('cell')
      .populate('village')
      .exec();
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programModel
      .findById(id)
      .populate('patients')
      .populate('coordinator')
      .populate('participants')
      .populate('province')
      .populate('district')
      .populate('sector')
      .populate('cell')
      .populate('village')
      .exec();

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }

    return program;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto): Promise<Program> {
    const { coordinatorId, startDate, endDate, ...updateData } = updateProgramDto;
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

    if (startDate !== undefined) {
      existingProgram.startDate = startDate;
    }
    if (endDate !== undefined) {
      existingProgram.endDate = endDate;
    }

    existingProgram.status = this.calculateProgramStatus(existingProgram.startDate, existingProgram.endDate);

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

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    const programs = await this.programModel.find().exec();
    for (const program of programs) {
      const newStatus = this.calculateProgramStatus(program.startDate, program.endDate);
      if (program.status !== newStatus) {
        program.status = newStatus;
        await program.save();
      }
    }
    console.log('Program statuses updated by cron job');
  }
}