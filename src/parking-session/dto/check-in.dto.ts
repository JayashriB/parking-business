import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum } from 'class-validator';
import { VehicleType } from 'src/parking-session/model/enum';

export class CheckInDto {
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @IsBoolean()
  isResident: boolean;
}
