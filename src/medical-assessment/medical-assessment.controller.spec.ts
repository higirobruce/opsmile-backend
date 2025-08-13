import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAssessmentController } from './medical-assessment.controller';
import { MedicalAssessmentService } from './medical-assessment.service';

describe('MedicalAssessmentController', () => {
  let controller: MedicalAssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalAssessmentController],
      providers: [MedicalAssessmentService],
    }).compile();

    controller = module.get<MedicalAssessmentController>(MedicalAssessmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
