import { Module, forwardRef } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { MedicalAssessment } from 'src/medical-assessment/entities/medical-assessment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { ProgramModule } from 'src/program/program.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    ActivityLogModule,
    forwardRef(() => ProgramModule)
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService]
})
export class PatientsModule { }
