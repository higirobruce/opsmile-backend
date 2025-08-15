import { Module } from '@nestjs/common';
import { MedicalAssessmentService } from './medical-assessment.service';
import { MedicalAssessmentController } from './medical-assessment.controller';
import { MedicalAssessment } from './entities/medical-assessment.entity';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalAssessmentSchema } from './schemas/medical-assessment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalAssessment.name, schema: MedicalAssessmentSchema }
    ]),
    PatientsModule,
    UsersModule
  ],
  controllers: [MedicalAssessmentController],
  providers: [MedicalAssessmentService],
  exports: [MedicalAssessmentService],
})
export class MedicalAssessmentModule {}