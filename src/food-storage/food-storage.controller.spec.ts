import { Test, TestingModule } from '@nestjs/testing';
import { FoodStorageController } from './food-storage.controller';

describe('FoodStorageController', () => {
  let controller: FoodStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodStorageController],
    }).compile();

    controller = module.get<FoodStorageController>(FoodStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
