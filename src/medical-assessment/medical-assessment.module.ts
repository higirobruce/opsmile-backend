import { Module } from '@nestjs/common';
import { MedicalAssessmentService } from './medical-assessment.service';
import { MedicalAssessmentController } from './medical-assessment.controller';
import { MedicalAssessment } from './entities/medical-assessment.entity';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalAssessmentSchema } from './schemas/medical-assessment.schema';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalAssessment.name, schema: MedicalAssessmentSchema }
    ]),
    PatientsModule,
    UsersModule,
    ActivityLogModule
  ],
  controllers: [MedicalAssessmentController],
  providers: [MedicalAssessmentService],
  exports: [MedicalAssessmentService],
})
export class MedicalAssessmentModule {}