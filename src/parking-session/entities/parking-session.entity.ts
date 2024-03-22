import { VehicleType } from 'src/parking-space/model/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ParkingSpace } from '../../parking-space/entities/parking-space.entity';

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
