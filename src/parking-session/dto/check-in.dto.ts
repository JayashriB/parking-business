import { IsBoolean, IsEnum } from 'class-validator';
import { VehicleType } from '../model/enum';

export class CheckInDto {
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @IsBoolean()
  isResident: boolean;
}
