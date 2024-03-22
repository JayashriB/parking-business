import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { Repository, DataSource } from 'typeorm';
import { ParkingSession } from './entities/parking-session.entity';
import { ParkingSpace } from './entities/parking-space.entity';
import { ParkingCharges } from './entities/parking-charges.entity';
import { Category, vehicleTypeToCategoryMap } from './model/enum';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { CheckInResponse, CheckOutResponse } from './model/types';

@Injectable()
export class ParkingSessionService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,

    @InjectRepository(ParkingSession)
    private parkingSessionRepository: Repository<ParkingSession>,

    @InjectRepository(ParkingCharges)
    private parkingChargesRepository: Repository<ParkingCharges>,

    @InjectEntityManager()
    private dataSource: DataSource,
  ) {}

  async checkIn({
    isResident,
    vehicleType,
  }: CheckInDto): Promise<CheckInResponse> {
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

  async checkOut({ parkingSessionId }: CheckOutDto): Promise<CheckOutResponse> {
    const activeParkingSession = await this.parkingSessionRepository.findOne({
      where: { id: parkingSessionId },
      relations: { parkingSpace: true },
    });
    if (!activeParkingSession)
      throw new BadRequestException(
        `Checkout: parking session id ${parkingSessionId} does not exist!`,
      );
    if (activeParkingSession.sessionEndDate)
      throw new BadRequestException(
        `Checkout: parking session ${parkingSessionId} has already ended`,
      );

    const { isResidenceParking, id } = activeParkingSession.parkingSpace;

    const vehicleChargeCategory = isResidenceParking
      ? Category.RESIDENT
      : vehicleTypeToCategoryMap[activeParkingSession.vehicleType];

    const { chargesPerHour } = await this.parkingChargesRepository.findOne({
      where: { category: vehicleChargeCategory },
    });

    let sessionLengthInMinutes;
    let charge;
    await this.dataSource.transaction(async (entityManager) => {
      const parkingEndTime = new Date();
      charge = this.calculateCharges(
        chargesPerHour,
        activeParkingSession.sessionStartDate,
        parkingEndTime,
      );
      activeParkingSession.sessionEndDate = parkingEndTime;
      activeParkingSession.charges = charge;
      sessionLengthInMinutes = this.getSessionLengthInMinutes(
        activeParkingSession.sessionStartDate,
        parkingEndTime,
      );
      await entityManager.save(ParkingSession, activeParkingSession);
      await entityManager.update(ParkingSpace, { id }, { occupied: false });
    });
    return {
      parkingSpaceId: id,
      sessionLengthInMinutes,
    };
  }

  private calculateCharges(
    chargePerHour: number,
    sessionStartTime: Date,
    sessionEndDate: Date,
  ) {
    const end = dayjs(sessionEndDate);
    const start = dayjs(sessionStartTime);
    // hours will be rounded up to the higher value e.g. 63 minutes session = 2 hour, 15 min session = 1 hour
    const hours = end.diff(start, 'hour') + 1;
    return hours * chargePerHour;
  }

  private getSessionLengthInMinutes(
    sessionStartTime: Date,
    sessionEndDate: Date,
  ) {
    const end = dayjs(sessionEndDate);
    const start = dayjs(sessionStartTime);
    const minutes = end.diff(start, 'minutes');
    return minutes;
  }
}
