import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';
import { MedicalAssessment } from 'src/medical-assessment/entities/medical-assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), TypeOrmModule.forFeature([MedicalAssessment])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService] 
})
export class PatientsModule {}
