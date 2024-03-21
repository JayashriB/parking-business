import { Injectable } from '@nestjs/common';
import { CreateParkingSpaceDto } from './dto/create-parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update-parking-space.dto';
import { Repository } from 'typeorm';
import { ParkingSpace } from './entities/parking-space.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,
  ) {}

  create(createParkingSpaceDto: CreateParkingSpaceDto) {
    return 'This action adds a new parkingSpace';
  }

  findAll() {
    return `This action returns all parkingSpace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingSpace`;
  }

  update(id: number, updateParkingSpaceDto: UpdateParkingSpaceDto) {
    return `This action updates a #${id} parkingSpace`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingSpace`;
  }
}
