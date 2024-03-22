import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpace } from './parking-session/entities/parking-space.entity';
import { ParkingCharges } from './parking-session/entities/parking-charges.entity';
import { ParkingSessionModule } from './parking-session/parking-session.module';
import { ParkingSession } from './parking-session/entities/parking-session.entity';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
