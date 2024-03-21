import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

/**Master data for Parking Space */

export async function createRandomParkingSpaceRecord() {
    const datasource = new DataSource({type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'jazz',
        password: 'jazz',
        database: 'parking'}); // Initialize your datasource
    
    await datasource.initialize();

    let parkingObj;

    for (let i = 1; i <= 150; i++) {
        parkingObj = {
            id: faker.string.uuid(),
            buildingNumber: 1,
            floorNumber: i <= 75 ? 1 : 2,
            spaceNumber: i,
            occupied: false,
            vehicalType: i <= 50 ? 'Any' : i >= 51 && i <= 130 ? 'Car' : 'Motorcycle',
            isResidenceParking: i <= 50,
        };


        await datasource
            .createQueryBuilder()
            .insert()
            .into('parking_space')
            .values(parkingObj)
            .execute();
    }
}

createRandomParkingSpaceRecord().then(() => {
    console.log('Random parking space records created successfully.');
}).catch(error => {
    console.error('Error creating random parking space records:', error);
});