import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ParkingSpace } from '../../parking-space/entities/parking-space.entity';

@Entity()
export class ParkingSession {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  sessionId: string;

  @Column()
  sessionStartDate: Date;

  @Column()
  sessionEndDate: Date;

  @Column()
  charges: number;

  @ManyToOne(() => ParkingSpace, (parkingSpace) => parkingSpace.parkingSessions)
  parkingSpace: ParkingSpace;
}
