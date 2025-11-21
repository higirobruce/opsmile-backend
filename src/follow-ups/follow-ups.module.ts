import { Module } from '@nestjs/common';
import { FollowUpsService } from './follow-ups.service';
import { FollowUpsController } from './follow-ups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowUpRecord, FollowUpSchema } from './schemas/follow-ups.schema';
import { PatientFilesModule } from 'src/patient-files/patient-files.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: FollowUpRecord.name,
          schema: FollowUpSchema
        }
      ]
    ),
    PatientFilesModule
  ],
  controllers: [FollowUpsController],
  providers: [FollowUpsService],
})
export class FollowUpsModule { }
