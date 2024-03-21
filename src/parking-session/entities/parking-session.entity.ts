import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class ParkingSession {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    sessionId: string;

    @Column()
    sessionStartDate: Date;

    @Column()
    sessionEndDate:  Date;

    @Column()
    charges: number;
}
