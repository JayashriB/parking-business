import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpaceService } from './parking-space.service';
import { ParkingSpaceController } from './parking-space.controller';
import { ParkingSpace } from './entities/parking-space.entity';
import { ParkingCharges } from './entities/parking-charges.entity';
import { ParkingSessionModule } from '../parking-session/parking-session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingSpace, ParkingCharges]),
    ParkingSessionModule,
  ],
  exports: [TypeOrmModule],
  controllers: [ParkingSpaceController],
  providers: [ParkingSpaceService],
})
export class ParkingSpaceModule {}
