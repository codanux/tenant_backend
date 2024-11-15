import { Test, TestingModule } from '@nestjs/testing';
import { InovicesService } from './inovices.service';

describe('InovicesService', () => {
  let service: InovicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InovicesService],
    }).compile();

    service = module.get<InovicesService>(InovicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
