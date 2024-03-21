import { Injectable } from '@nestjs/common';
import { CreateParkingSessionDto } from './dto/create-parking-session.dto';
import { UpdateParkingSessionDto } from './dto/update-parking-session.dto';

@Injectable()
export class ParkingSessionService {
  create(createParkingSessionDto: CreateParkingSessionDto) {
    return 'This action adds a new parkingSession';
  }

  findAll() {
    return `This action returns all parkingSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingSession`;
  }

  update(id: number, updateParkingSessionDto: UpdateParkingSessionDto) {
    return `This action updates a #${id} parkingSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingSession`;
  }
}
