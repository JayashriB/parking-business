import { ParkingSessionService } from './parking-session.service';
import { createMock } from '@golevelup/ts-jest';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ParkingSession } from './entities/parking-session.entity';
import { ParkingSpace } from './entities/parking-space.entity';
import { ParkingCharges } from './entities/parking-charges.entity';
import { Category, VehicleType } from './model/enum';

describe('ParkingSessionService', () => {
  const mockParkingSessionRepo = createMock<Repository<ParkingSession>>();
  const mockParkingSpaceRepo = createMock<Repository<ParkingSpace>>();
  const mockSave = jest.fn();
  const mockDatasource = createMock<DataSource>();
  const mockParkingChargesRepo = createMock<Repository<ParkingCharges>>();

  const service = new ParkingSessionService(
    mockParkingSpaceRepo,
    mockParkingSessionRepo,
    mockParkingChargesRepo,
    mockDatasource,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('checkIn', () => {
    it('throw error when no parking space is available', async () => {
      mockParkingSpaceRepo.findOne.mockResolvedValue(null);
      await expect(
        service.checkIn({ isResident: true, vehicleType: VehicleType.CAR }),
      ).rejects.toThrow();
    });
    it('should return parking space available and create a parking session', async () => {
      mockParkingSpaceRepo.findOne.mockResolvedValue({
        id: '1',
        isResidenceParking: true,
        buildingNumber: 1,
        floorNumber: 1,
        occupied: false,
        spaceNumber: 1,
        allowedVehicleType: 'Any',
        parkingSessions: [],
      });

      await service.checkIn({ isResident: true, vehicleType: VehicleType.CAR });
      expect(mockDatasource.transaction).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkOut', () => {
    it('should throw error when parking session id does not exist', async () => {
      mockParkingSessionRepo.findOne.mockResolvedValue(null);
      await expect(
        service.checkOut({ parkingSessionId: '1' }),
      ).rejects.toThrow();
    });
    it('should throw error if parking session has not ended', async () => {
      mockParkingSessionRepo.findOne.mockResolvedValue({
        id: '1',
        sessionStartDate: new Date(),
        sessionEndDate: new Date(),
        charges: 6,
        vehicleType: VehicleType.CAR,
      } as unknown as ParkingSession);
      await expect(service.checkOut({ parkingSessionId: '1' })).rejects.toThrow(
        'Checkout: parking session 1 has already ended',
      );
    });
    it('should successfully end the parking session', async () => {
      mockParkingSessionRepo.findOne.mockResolvedValue({
        id: '1',
        sessionStartDate: new Date(),
        sessionEndDate: null,
        charges: 6,
        vehicleType: VehicleType.CAR,
        parkingSpace: {
          id: '1',
          isResidenceParking: true,
          allowedVehicleType: VehicleType.CAR,
          buildingNumber: 1,
          floorNumber: 1,
          spaceNumber: 1,
          occupied: true,
        } as ParkingSpace,
      });
      mockParkingChargesRepo.findOne.mockResolvedValue({
        id: '1',
        category: Category.CAR,
        chargesPerHour: 5,
      });
      await service.checkOut({ parkingSessionId: '1' });
      expect(mockDatasource.transaction).toHaveBeenCalledTimes(1);
    });
  });
});
