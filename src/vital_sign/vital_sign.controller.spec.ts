import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignController } from './vital_sign.controller';
import { VitalSignService } from './vital_sign.service';

describe('VitalSignController', () => {
  let controller: VitalSignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitalSignController],
      providers: [VitalSignService],
    }).compile();

    controller = module.get<VitalSignController>(VitalSignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
