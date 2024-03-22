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
import * as dayjs from 'dayjs';


@Injectable()
export class ParkingSessionService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,

    @InjectRepository(ParkingSession)
    private parkingSessionRepository: Repository<ParkingSession>,

    @InjectEntityManager()
    private dataSource: DataSource,
  ) {}

  async checkIn({ isResident, vehicleType }: CheckInDto) {
    const query = {
      isResidenceParking: isResident,
      occupied: false,
    };
    if (!isResident) query['allowedVehicleType'] = vehicleType;

    const availableParkingSpot = await this.parkingSpaceRepository.findOne({
      where: query,
    });

    if (!availableParkingSpot)
      throw new NotFoundException('No parking spot available.');

    availableParkingSpot.occupied = true;
    const parkingSession = new ParkingSession();
    parkingSession.parkingSpace = availableParkingSpot;
    parkingSession.vehicleType = vehicleType;
    
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
    };
  }

  async checkOut({parkingSessionId}: CheckOutDto) {
    // const activeParkingSession = await this.parkingSessionRepository.findOne({where: { id: parkingSessionId}});
    // if (!activeParkingSession) throw new BadRequestException(`Checkout: parking session id ${parkingSessionId} does not exist`);

    // const {isResidenceParking, id: parkingSpaceId, chargePerHour } = activeParkingSession.parkingSpace;
    // const parkingSpace = await this.parkingSpaceRepository.findOne({where: {id: parkingSpaceId}});

    // await this.dataSource.transaction(async entityManager => {
    //   parkingSpace.occupied = false;
    //   const parkingEndTime = new Date();
    //   const charge = this.calculateCharges(parkingSpace.chargePerHour, activeParkingSession.sessionStartDate, parkingEndTime);
    //   activeParkingSession.sessionEndDate = parkingEndTime;
    //   activeParkingSession.charges = charge;
    //   await entityManager.save(ParkingSession, activeParkingSession);
    //   await entityManager.save(ParkingSpace, parkingSpace);
    // })

  }

  private calculateCharges(chargePerHour: number, sessionStartTime: Date, sessionEndDate: Date) {
    const end = dayjs(sessionEndDate);
    const start = dayjs(sessionStartTime);
    const hours = end.diff(start, 'hour');
    return hours * chargePerHour;
  }

}
