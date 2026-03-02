export interface ICar {
  _id?: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  createdAt?: Date;
  updatedAt?: Date;
}