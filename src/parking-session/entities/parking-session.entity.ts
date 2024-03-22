import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { VehicleType } from '../model/enum';
import { ParkingSpace } from './parking-space.entity';

@Entity()
export class ParkingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  sessionStartDate: Date;

  @Column({ default: null })
  sessionEndDate: Date | null;

  @Column({ default: 0 })
  charges: number;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  vehicleType: VehicleType;

  @ManyToOne(() => ParkingSpace, (parkingSpace) => parkingSpace.parkingSessions)
  parkingSpace: ParkingSpace;
}
