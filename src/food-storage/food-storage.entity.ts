import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FoodStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column({ type: 'date' })
  expirationDate: string;
}
