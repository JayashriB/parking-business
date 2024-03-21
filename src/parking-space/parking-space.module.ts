import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpaceService } from './parking-space.service';
import { ParkingSpaceController } from './parking-space.controller';
import { ParkingSpace } from './entities/parking-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpace])],
  controllers: [ParkingSpaceController],
  providers: [ParkingSpaceService],
})
export class ParkingSpaceModule {}
