import { IsBoolean, IsEnum } from 'class-validator';
import { VehicleType } from '../model/enum';
import { ApiProperty } from '@nestjs/swagger';

export class CheckInDto {
  @ApiProperty({ enum: VehicleType })
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isResident: boolean;
}
