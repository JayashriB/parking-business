import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSessionService } from './parking-session.service';
import { ParkingSessionController } from './parking-session.controller';
import { ParkingSession } from './entities/parking-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSession])],
  controllers: [ParkingSessionController],
  providers: [ParkingSessionService],
})
export class ParkingSessionModule {}
