import { Schema, model } from 'mongoose';
import type { ICar } from '../../domain/car.types.ts';

const CarSchema = new Schema<ICar>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', CarSchema);