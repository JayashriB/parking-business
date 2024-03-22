import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupationService } from './occupation.service';
import { OccupationController } from './occupation.controller';
import { ParkingSession } from '../parking-session/entities/parking-session.entity';
import { ParkingSpace } from '../parking-session/entities/parking-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSession, ParkingSpace])],
  exports: [TypeOrmModule],
  controllers: [OccupationController],
  providers: [OccupationService],
})
export class OccupationModule {}
