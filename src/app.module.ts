import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ParkingSpaceModule } from './parking-space/parking-space.module';
import { ParkingSpace } from './parking-space/entities/parking-space.entity';
import { ParkingSessionModule } from './parking-session/parking-session.module';
import { ParkingSession } from './parking-session/entities/parking-session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parking',
      entities: [ParkingSpace, ParkingSession],
      synchronize: true,
    }),
    ParkingSpaceModule,
    ParkingSessionModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
