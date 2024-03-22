import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ParkingSession } from '../parking-session/entities/parking-session.entity';
import { ParkingSpace } from '../parking-session/entities/parking-space.entity';

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,

    @InjectRepository(ParkingSession)
    private parkingSessionRepository: Repository<ParkingSession>,

    @InjectEntityManager()
    private dataSource: DataSource,
  ) {}

  async getOccupiedSpots() {
    const occupiedParkingSpots = await this.parkingSpaceRepository.find({
      relations: { parkingSessions: true },
    });

    if (!occupiedParkingSpots.length)
      throw new NotFoundException('No occupied parking space found.');

    return occupiedParkingSpots.map((p) => ({
      parkingSpaceId: p.id,
      buildingNumber: p.buildingNumber,
      floorNumber: p.floorNumber,
      spaceNumber: p.spaceNumber,
      occupied: p.occupied,
      vehicleType: p.parkingSessions.find((e) => !e.sessionEndDate)
        ?.vehicleType,
    }));
  }
}
