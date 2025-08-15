import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VitalSignsService } from './vital_sign.service';
import { VitalSignsController } from './vital_sign.controller';
import { VitalSign, VitalSignSchema } from './schemas/vital_sign.schema';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VitalSign.name, schema: VitalSignSchema }]),
    PatientsModule,
    UsersModule,
  ],
  controllers: [VitalSignsController],
  providers: [VitalSignsService],
  exports: [VitalSignsService],
})
export class VitalSignsModule {}