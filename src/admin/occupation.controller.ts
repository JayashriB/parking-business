import { Controller, Get } from '@nestjs/common';
import { OccupationService } from './occupation.service';

@Controller('/')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Get('occupation')
  async ooccupiedSpots() {
    return this.occupationService.getOccupiedSpots();
  }
}
