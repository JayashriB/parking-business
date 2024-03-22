import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

/**Master data for Parking Charges */

export async function loadChargesPerCategory() {
  const datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'jazz',
    password: 'jazz',
    database: 'parking',
  });

  // Initialize your datasource
  await datasource.initialize();

  let charges = [];
  let category = ['Resident', 'Car', 'Motorcycle'];

  for (let i = 0; i < category.length; i++) {
    charges.push({
      id: faker.string.uuid(),
      category: category[i],
      chargesPerHour:
        category[i] === 'Resident' ? 0 : category[i] === 'Car' ? 5 : 3,
    });
  }

  await datasource
    .createQueryBuilder()
    .insert()
    .into('parking_charges')
    .values(charges)
    .execute();
}

loadChargesPerCategory()
  .then(() => {
    console.log('Records created successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error creating charges records:', error);
    process.exit(1);
  });
