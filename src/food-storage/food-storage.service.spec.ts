import { Test, TestingModule } from '@nestjs/testing';
import { FoodStorageService } from './food-storage.service';

describe('FoodStorageService', () => {
  let service: FoodStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodStorageService],
    }).compile();

    service = module.get<FoodStorageService>(FoodStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
