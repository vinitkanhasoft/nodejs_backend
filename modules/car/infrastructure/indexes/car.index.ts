import { CarModel } from '../schemas/car.schema';

export const createCarIndexes = async () => {
  await CarModel.createIndexes();
};