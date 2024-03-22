import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { DataSource } from 'typeorm';
import { ParkingSpaceModule } from './parking-space/parking-space.module';
import { ParkingSpace } from './parking-space/entities/parking-space.entity';
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
      entities: [ParkingSpace, ParkingSession],
      synchronize: true,
    }),
    ParkingSpaceModule,
    ParkingSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
