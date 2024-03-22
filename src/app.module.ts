import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSessionModule } from './parking-session/parking-session.module';
import { ParkingSpace } from './parking-session/entities/parking-space.entity';
import { ParkingCharges } from './parking-session/entities/parking-charges.entity';
import { ParkingSession } from './parking-session/entities/parking-session.entity';
import { OccupationModule } from './admin/occupation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'jazz',
      password: 'jazz',
      database: 'parking',
      entities: [ParkingSpace, ParkingSession, ParkingCharges],
      synchronize: true,
    }),
    ParkingSessionModule,
    OccupationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
