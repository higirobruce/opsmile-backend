import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) { }

  create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepository.create(createPatientDto)
    return this.patientRepository.save(patient)
  }

  findAll() {
    return this.patientRepository.find()
  }

  findOne(id: string) {
    return this.patientRepository.findOne(
      {
        where: { id },
        relations: { medical_assessments: true }
      }
    )
  }

  //search case-insensitive
  async findOneByPhoneNumberOrName(search: string) {

    let p = await this.patientRepository.find(
      {
        where: [
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
          { phoneNumber: ILike(`%${search}%`) }
        ],
        relations: { medicalAssessments: true }
      }
    )
    if (!p) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: 'Patient not found',
      }
    }
    return p;
  }


  update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.patientRepository.update(id, updatePatientDto)
  }

  remove(id: string) {
    return this.patientRepository.delete(id)
  }
}
