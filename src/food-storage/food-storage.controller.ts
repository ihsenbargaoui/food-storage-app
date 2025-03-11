import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FoodStorageService } from './food-storage.service';
import { FoodStorage } from './food-storage.entity';

@Controller('food-storage')
export class FoodStorageController {
  constructor(private readonly foodStorageService: FoodStorageService) {}

  @Post()
  create(@Body() foodItem: Partial<FoodStorage>): Promise<FoodStorage> {
    return this.foodStorageService.create(foodItem);
  }

  @Get()
  findAll(): Promise<FoodStorage[]> {
    return this.foodStorageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FoodStorage | null> {
    return this.foodStorageService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() foodItem: Partial<FoodStorage>): Promise<FoodStorage> {
    return this.foodStorageService.update(id, foodItem);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.foodStorageService.remove(id);
  }
}
