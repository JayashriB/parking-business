import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingSessionService } from './parking-session.service';
import { CreateParkingSessionDto } from './dto/create-parking-session.dto';
import { UpdateParkingSessionDto } from './dto/update-parking-session.dto';

@Controller('parking-session')
export class ParkingSessionController {
  constructor(private readonly parkingSessionService: ParkingSessionService) {}

  @Post()
  create(@Body() createParkingSessionDto: CreateParkingSessionDto) {
    return this.parkingSessionService.create(createParkingSessionDto);
  }

  @Get()
  findAll() {
    return this.parkingSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingSessionDto: UpdateParkingSessionDto) {
    return this.parkingSessionService.update(+id, updateParkingSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSessionService.remove(+id);
  }
}
