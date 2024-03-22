import { Controller, Post, Body } from '@nestjs/common';
import { ParkingSessionService } from './parking-session.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Controller('/')
export class ParkingSessionController {
  constructor(private readonly parkingSessionService: ParkingSessionService) {}

  @Post('check-in')
  checkIn(@Body() checkInDto: CheckInDto) {
    return this.parkingSessionService.checkIn(checkInDto);
  }

  @Post('check-out')
  checkOut(@Body() checkOutDto: CheckOutDto) {
    return this.parkingSessionService.checkOut(checkOutDto);
  }
}
