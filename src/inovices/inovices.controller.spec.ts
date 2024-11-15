import { Test, TestingModule } from '@nestjs/testing';
import { InovicesController } from './inovices.controller';
import { InovicesService } from './inovices.service';

describe('InovicesController', () => {
  let controller: InovicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InovicesController],
      providers: [InovicesService],
    }).compile();

    controller = module.get<InovicesController>(InovicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
