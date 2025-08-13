import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAssessmentService } from './medical-assessment.service';
import { MedicalAssessmentController } from './medical-assessment.controller';
import { MedicalAssessment } from './entities/medical-assessment.entity';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalAssessment]),
    PatientsModule,
    UsersModule,
  ],
  controllers: [MedicalAssessmentController],
  providers: [MedicalAssessmentService],
  exports: [MedicalAssessmentService],
})
export class MedicalAssessmentModule {}