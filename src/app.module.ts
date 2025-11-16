import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
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
import { AnesthesiaModule } from './anesthesia/anesthesia.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DistrictsModule } from './districts/districts.module';
import { SectorsModule } from './sectors/sectors.module';
import { CellsModule } from './cells/cells.module';
import { VillagesModule } from './villages/villages.module';
import { ProgressiveNotesModule } from './progressive-notes/progressive-notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    ScheduleModule.forRoot(),
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
    ProvincesModule,
    DistrictsModule,
    SectorsModule,
    CellsModule,
    VillagesModule,
    ProgressiveNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
