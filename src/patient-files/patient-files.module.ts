import { Module } from '@nestjs/common';
import { PatientFilesService } from './patient-files.service';
import { PatientFilesController } from './patient-files.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientFiles, PatientFilesSchema } from './schemas/patient-files.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PatientFiles.name, schema: PatientFilesSchema }
    ])
  ],
  controllers: [PatientFilesController],
  providers: [PatientFilesService],
  exports: [PatientFilesService],
})
export class PatientFilesModule { }
