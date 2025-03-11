import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodStorage } from './food-storage.entity';

@Injectable()
export class FoodStorageService {
  constructor(
    @InjectRepository(FoodStorage)
    private readonly foodStorageRepository: Repository<FoodStorage>,
  ) {}

  // Create a food item
  async create(foodItem: Partial<FoodStorage>): Promise<FoodStorage> {
    const newFood = this.foodStorageRepository.create(foodItem);
    return this.foodStorageRepository.save(newFood);
  }

  // Get all food items
  async findAll(): Promise<FoodStorage[]> {
    return this.foodStorageRepository.find();
  }

 // Find a food item by ID
async findOne(id: number): Promise<FoodStorage | null> {
  return await this.foodStorageRepository.findOne({
    where: { id },
  });
}


  // Update a food item
  async update(id: number, foodItem: Partial<FoodStorage>): Promise<FoodStorage> {
    await this.foodStorageRepository.update(id, foodItem);
    return this.findOne(id);
  }

  // Delete a food item
  async remove(id: number): Promise<void> {
    await this.foodStorageRepository.delete(id);
  }
}
