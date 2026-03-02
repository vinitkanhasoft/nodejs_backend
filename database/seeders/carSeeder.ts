import { CarModel } from '../../modules/car/infrastructure/schemas/car.schema';

export const seedCars = async () => {
  const count = await CarModel.countDocuments();
  if (count > 0) return;

  await CarModel.insertMany([
    { name: 'Toyota Camry', price: 20000, brand: 'Toyota', year: 2021 },
    { name: 'Honda Civic', price: 18000, brand: 'Honda', year: 2020 },
    { name: 'Ford Mustang', price: 35000, brand: 'Ford', year: 2022 },
  ]);

  console.log('Car seeder finished');
};
