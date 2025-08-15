import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../schemas/user.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    username?: string
    password?: string
    email?: string
    firstName?: string
    lastName?: string
    role?: UserRole
}
