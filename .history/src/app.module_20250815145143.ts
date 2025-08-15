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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://mongo-admin:2tij6e0anAgKU6tb@myfreecluster.kxvgw.mongodb.net/eproc?retryWrites=true&w=majority&appName=MyFreeCluster'),
    
    PatientsModule, UsersModule, MedicalAssessmentModule, AnesthesiaModule, AuthModule, VitalSignsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
