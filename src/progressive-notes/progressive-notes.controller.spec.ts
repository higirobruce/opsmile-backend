import { Test, TestingModule } from '@nestjs/testing';
import { ProgressiveNotesController } from './progressive-notes.controller';
import { ProgressiveNotesService } from './progressive-notes.service';

describe('ProgressiveNotesController', () => {
  let controller: ProgressiveNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressiveNotesController],
      providers: [ProgressiveNotesService],
    }).compile();

    controller = module.get<ProgressiveNotesController>(ProgressiveNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
