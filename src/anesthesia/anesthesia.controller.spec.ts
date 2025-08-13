import { Test, TestingModule } from '@nestjs/testing';
import { AnesthesiaController } from './anesthesia.controller';
import { AnesthesiaService } from './anesthesia.service';

describe('AnesthesiaController', () => {
  let controller: AnesthesiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnesthesiaController],
      providers: [AnesthesiaService],
    }).compile();

    controller = module.get<AnesthesiaController>(AnesthesiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
