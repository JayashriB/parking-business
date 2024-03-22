import { Category } from '../model/enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkingCharges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column()
  chargesPerHour: number;
}
