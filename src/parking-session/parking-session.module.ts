import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSessionService } from './parking-session.service';
import { ParkingSessionController } from './parking-session.controller';
import { ParkingSession } from './entities/parking-session.entity';
import { ParkingSpace } from './entities/parking-space.entity';
import { ParkingCharges } from './entities/parking-charges.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingSession, ParkingSpace, ParkingCharges]),
  ],
  exports: [TypeOrmModule],
  controllers: [ParkingSessionController],
  providers: [ParkingSessionService],
})
export class ParkingSessionModule {}
