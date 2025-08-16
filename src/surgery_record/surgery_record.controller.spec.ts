import { Test, TestingModule } from '@nestjs/testing';
import { SurgeryRecordController } from './surgery_record.controller';
import { SurgeryRecordService } from './surgery_record.service';

describe('SurgeryRecordController', () => {
  let controller: SurgeryRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurgeryRecordController],
      providers: [SurgeryRecordService],
    }).compile();

    controller = module.get<SurgeryRecordController>(SurgeryRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
