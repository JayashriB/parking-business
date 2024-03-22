import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { VehicleType } from '../model/enum';
import { ParkingSession } from '../../parking-session/entities/parking-session.entity';

@Entity()
@Index(['buildingNumber', 'floorNumber', 'spaceNumber'], { unique: true })
export class ParkingSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  buildingNumber: number;

  @Column()
  floorNumber: number;

  @Column()
  spaceNumber: number;

  @Column()
  occupied: boolean;

  @Column()
  allowedVehicleType: string;

  @Column()
  isResidenceParking: boolean;

  @OneToMany(
    () => ParkingSession,
    (parkingSession) => parkingSession.parkingSpace,
  )
  parkingSessions: ParkingSession[];
}
