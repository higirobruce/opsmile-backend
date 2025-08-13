import { Test, TestingModule } from '@nestjs/testing';
import { AnesthesiaService } from './anesthesia.service';

describe('AnesthesiaService', () => {
  let service: AnesthesiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnesthesiaService],
    }).compile();

    service = module.get<AnesthesiaService>(AnesthesiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
