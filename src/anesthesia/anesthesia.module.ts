import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnesthesiaService } from './anesthesia.service';
import { AnesthesiaController } from './anesthesia.controller';
import { Anesthesia, AnesthesiaSchema } from './schemas/anesthesia.schema';
import { PatientsModule } from '../patients/patients.module';
import { UsersModule } from '../users/users.module';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Anesthesia.name, schema: AnesthesiaSchema }
    ]),
    PatientsModule,
    UsersModule,
    ActivityLogModule
  ],
  controllers: [AnesthesiaController],
  providers: [AnesthesiaService],
  exports: [AnesthesiaService]
})
export class AnesthesiaModule {}