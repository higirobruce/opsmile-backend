import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';
import { VitalSign } from './entities/vital_sign.entity';
import { VitalSignsController } from './vital_sign.controller';
import { VitalSignsService } from './vital_sign.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VitalSign]),
    PatientsModule,
    UsersModule,
  ],
  controllers: [VitalSignsController],
  providers: [VitalSignsService],
  exports: [VitalSignsService],
})
export class VitalSignsModule {}