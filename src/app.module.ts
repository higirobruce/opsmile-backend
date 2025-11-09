import { AnesthesiaModule } from './anesthesia/anesthesia.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { MedicalAssessmentModule } from './medical-assessment/medical-assessment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VitalSignsModule } from './vital_sign/vital_sign.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SurgeryRecordModule } from './surgery_record/surgery_record.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { ProgressModule } from './progress/progress.module';
import { DischargeModule } from './discharge/discharge.module';
import { ProgramModule } from './program/program.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    PatientsModule,
    UsersModule,
    MedicalAssessmentModule,
    AnesthesiaModule,
    AuthModule,
    VitalSignsModule,
    SurgeryRecordModule,
    ActivityLogModule,
    ProgressModule,
    DischargeModule,
    ProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
