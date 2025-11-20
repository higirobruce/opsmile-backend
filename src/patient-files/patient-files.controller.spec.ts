import { Test, TestingModule } from '@nestjs/testing';
import { PatientFilesController } from './patient-files.controller';
import { PatientFilesService } from './patient-files.service';

describe('PatientFilesController', () => {
  let controller: PatientFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientFilesController],
      providers: [PatientFilesService],
    }).compile();

    controller = module.get<PatientFilesController>(PatientFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
