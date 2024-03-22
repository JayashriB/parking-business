import { VehicleType } from './enum';

export interface CheckOutResponse {
  parkingSpaceId: string;
  sessionLengthInMinutes: number;
}

export interface CheckInResponse {
  parkingSessionId: string;
  parkingSpaceNumber: number;
  parkingFloor: number;
}

export interface OccupiedSpot {
  parkingSpaceId: string;
  buildingNumber: number;
  floorNumber: number;
  spaceNumber: number;
  occupied: boolean;
  vehicleType: VehicleType;
}
