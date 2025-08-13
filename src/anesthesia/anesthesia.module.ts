import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnesthesiaService } from './anesthesia.service';
import { AnesthesiaController } from './anesthesia.controller';
import { Anesthesia } from './entities/anesthesia.entity';
import { PatientsModule } from '../patients/patients.module';
import { PatientsService } from 'src/patients/patients.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Anesthesia]),
    PatientsModule,
    UsersModule
  ],
  controllers: [AnesthesiaController],
  providers: [AnesthesiaService],
  exports: [AnesthesiaService],
})
export class AnesthesiaModule {}