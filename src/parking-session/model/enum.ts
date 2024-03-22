export enum VehicleType {
  MOTOR = 'Motorcycle',
  CAR = 'Car',
}

export enum Category {
  RESIDENT = 'Resident',
  CAR = 'Car',
  MOTOR = 'Motorcycle',
}

export const vehicleTypeToCategoryMap: Record<VehicleType, Category> = {
  [VehicleType.CAR]: Category.CAR,
  [VehicleType.MOTOR]: Category.MOTOR,
};
