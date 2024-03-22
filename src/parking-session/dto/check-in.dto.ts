import { VehicalType } from 'src/parking-space/model/enum';

export class CheckInDto {
  vehicleType: VehicalType;
  isResident: boolean;
}
