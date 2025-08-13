import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAssessmentModule } from './medical-assessment/medical-assessment.module';
import { AnesthesiaModule } from './anesthesia/anesthesia.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VitalSignsModule } from './vital_sign/vital_sign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pmsdb',
      autoLoadEntities: true,
      synchronize: true,
    }), PatientsModule, UsersModule, MedicalAssessmentModule, AnesthesiaModule, AuthModule, VitalSignsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
