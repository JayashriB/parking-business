import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { Repository, EntityManager, DataSource } from 'typeorm';
import { ParkingSession } from './entities/parking-session.entity';
import { ParkingSpace } from '../parking-space/entities/parking-space.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParkingSessionService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,

    @InjectEntityManager()
    private dataSource: DataSource,
  ) {}

  async checkIn(checkInDto: CheckInDto) {
    // if(checkInDto.isResident && !checkInDto.vehicleType.includes['Any'])
    //   throw new BadRequestException('Not a legal resident!');

    const availableParkingSpot = await this.parkingSpaceRepository.findOne({
      where: {
        isResidenceParking: checkInDto.isResident,
        vehicalType: checkInDto.vehicleType,
        occupied: false,
      },
    });

    if (!availableParkingSpot)
      throw new NotFoundException('No parking spot available.');

    availableParkingSpot.occupied = true;
    const parkingSession = new ParkingSession();
    parkingSession.parkingSpace = availableParkingSpot;
    let parkingSessionId;
    await this.dataSource.transaction(async (entityManager) => {
      const { id } = await entityManager.save(ParkingSession, parkingSession);
      await entityManager.save(ParkingSpace, availableParkingSpot);
      parkingSessionId = id;
    });

    return {
      parkingSessionId: parkingSessionId,
      parkingSpaceNumber: availableParkingSpot.spaceNumber,
      parkingFloor: availableParkingSpot.floorNumber,
    }; //TODO
  }

  async checkOut(checkOutDto: CheckOutDto) {
    return `This action returns all parkingSession`;
  }
}
