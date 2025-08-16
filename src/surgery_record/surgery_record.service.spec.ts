import { Test, TestingModule } from '@nestjs/testing';
import { SurgeryRecordService } from './surgery_record.service';

describe('SurgeryRecordService', () => {
  let service: SurgeryRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurgeryRecordService],
    }).compile();

    service = module.get<SurgeryRecordService>(SurgeryRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
