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
  id: number;

  @CreateDateColumn()
  sessionStartDate: Date;

  @Column({ default: null })
  sessionEndDate: Date | null;

  @Column({ default: 0 })
  charges: number;

  @ManyToOne(() => ParkingSpace, (parkingSpace) => parkingSpace.parkingSessions)
  parkingSpace: ParkingSpace;
}
