import { Module } from '@nestjs/common';
import { DischargeController } from './discharge.controller';
import { DischargeService } from './discharge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Discharge, DischargeSchema } from './schemas/discharge.schema';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';
import { PatientFilesModule } from 'src/patient-files/patient-files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Discharge.name, schema: DischargeSchema }]),
    PatientsModule,
    UsersModule,
    PatientFilesModule
  ],
  controllers: [DischargeController],
  providers: [DischargeService],
  exports: [DischargeService],
})
export class DischargeModule {}