import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAssessmentService } from './medical-assessment.service';

describe('MedicalAssessmentService', () => {
  let service: MedicalAssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalAssessmentService],
    }).compile();

    service = module.get<MedicalAssessmentService>(MedicalAssessmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
