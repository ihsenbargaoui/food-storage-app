import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodStorageModule } from './food-storage/food-storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // ⚠️ Assurez-vous que c'est bien MySQL et non PostgreSQL
      host: 'localhost',
      port: 3306,
      username: 'root',  // ⚠️ Changez 'postgres' par 'root' (ou un autre utilisateur MySQL)
      password: 'root',  // ⚠️ Remplacez par le mot de passe de MySQL
      database: 'food_storage_db',  // ⚠️ Vérifiez que cette base existe bien
      autoLoadEntities: true,
      synchronize: true,  // ⚠️ Activez si vous voulez synchroniser les entités
    }),
    FoodStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
