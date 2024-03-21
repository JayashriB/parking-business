import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';
import { VehicalType } from '../model/enum';

@Entity()
export class ParkingSpace {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @PrimaryColumn()
    buildingNumber: number;

    @PrimaryColumn()
    floorNumber: number;

    @PrimaryColumn()
    spaceNumber: number;

    @Column()
    occupied: boolean;

    @Column({
        type: "enum",
        enum: VehicalType,
    })
    vehicalType: VehicalType;

    @Column()
    residenceParking: boolean;
}
