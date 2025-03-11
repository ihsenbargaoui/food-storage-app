import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodStorage } from './food-storage.entity';
import { FoodStorageService } from './food-storage.service';
import { FoodStorageController } from './food-storage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FoodStorage])],
  providers: [FoodStorageService],
  controllers: [FoodStorageController],
  exports: [TypeOrmModule],
})
export class FoodStorageModule {}

