import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpace } from '../parking-session/entities/parking-space.entity';
import { OccupiedSpot } from 'src/parking-session/model/types';

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,
  ) {}

  async getOccupiedSpots(): Promise<OccupiedSpot[]> {
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
