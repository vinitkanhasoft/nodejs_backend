import { ICar } from './car.types';

export class CarEntity {
  private data: ICar;

  constructor(data: ICar) {
    this.data = data;
  }

  get value(): ICar {
    return this.data;
  }

  updatePrice(price: number) {
    if (price <= 0) throw new Error('Invalid price');
    this.data.price = price;
  }

  updateMileage(mileage: number) {
    this.data.mileage = mileage;
  }
}
