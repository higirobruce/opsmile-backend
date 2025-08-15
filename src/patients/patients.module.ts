import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { MedicalAssessment } from 'src/medical-assessment/entities/medical-assessment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }])
  
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService] 
})
export class PatientsModule {}
