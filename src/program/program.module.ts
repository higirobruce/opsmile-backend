import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramService } from './program.service';
import { Program, ProgramSchema } from './schemas/program.schema';
import { ProgramController } from './program.controller';
import { UsersModule } from 'src/users/users.module';
import { PatientsService } from 'src/patients/patients.service';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }]),
    UsersModule
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}