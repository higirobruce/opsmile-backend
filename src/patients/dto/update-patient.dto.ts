import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    firstName: string
    lastName: string
    gender: 'F' | 'M'
    phoneNumber: string
    email: string
    countryOfBirth: string
    status: 'Active' | 'Inactive'
    programId?: string
}
