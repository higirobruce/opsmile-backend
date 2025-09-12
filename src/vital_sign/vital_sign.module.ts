import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VitalSignsService } from './vital-signs.service';
import { VitalSignsController } from './vital-signs.controller';
import { VitalSign, VitalSignSchema } from './schemas/vital_sign.schema';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VitalSign.name, schema: VitalSignSchema }]),
    PatientsModule,
    UsersModule,
    ActivityLogModule
  ],
  controllers: [VitalSignsController],
  providers: [VitalSignsService],
  exports: [VitalSignsService],
})
export class VitalSignsModule {}