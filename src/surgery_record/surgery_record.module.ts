import { Module } from '@nestjs/common';
import { SurgeryRecordService } from './surgery_record.service';
import { SurgeryRecordController } from './surgery_record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SurgeryRecord } from './entities/surgery_record.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { UsersModule } from 'src/users/users.module';
import { SurgeryRecordSchema } from './schemas/surgery_record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SurgeryRecord.name, schema: SurgeryRecordSchema },
    ]),
    PatientsModule,
    UsersModule,
  ],
  controllers: [SurgeryRecordController],
  providers: [SurgeryRecordService],
  exports: [SurgeryRecordService],
})
export class SurgeryRecordModule {}
