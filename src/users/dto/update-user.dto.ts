import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    username?: string
    password?: string
    email?: string
    firstName?: string
    lastName?: string
    role?: 'admin' | 'user' | 'superadmin' | 'registration-clerk' | 'nurse' | 'physician'
        | 'surgeon' | 'anesthetist' | 'lab-technician' | 'discharge-coordinator' | 'follow-up-nurse'
        | 'pharmacist' | 'auditor' | 'patient'
}
