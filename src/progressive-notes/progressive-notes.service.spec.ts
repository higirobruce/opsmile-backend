import { Test, TestingModule } from '@nestjs/testing';
import { ProgressiveNotesService } from './progressive-notes.service';

describe('ProgressiveNotesService', () => {
  let service: ProgressiveNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressiveNotesService],
    }).compile();

    service = module.get<ProgressiveNotesService>(ProgressiveNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
