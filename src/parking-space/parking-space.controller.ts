import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingSpaceService } from './parking-space.service';
import { CreateParkingSpaceDto } from './dto/create-parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update-parking-space.dto';

@Controller('parking-space')
export class ParkingSpaceController {
  constructor(private readonly parkingSpaceService: ParkingSpaceService) {}

  @Post()
  create(@Body() createParkingSpaceDto: CreateParkingSpaceDto) {
    return this.parkingSpaceService.create(createParkingSpaceDto);
  }

  @Get()
  findAll() {
    return this.parkingSpaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSpaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingSpaceDto: UpdateParkingSpaceDto) {
    return this.parkingSpaceService.update(+id, updateParkingSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSpaceService.remove(+id);
  }
}
