import { CarModel } from '../schemas/car.schema';
import { ICar } from '../../domain/car.types';
import { PipelineStage } from 'mongoose';

export class CarRepository {
  async create(data: ICar) {
    return CarModel.create(data);
  }

  async update(id: string, data: Partial<ICar>) {
    return CarModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return CarModel.findByIdAndDelete(id);
  }

  async findById(id: string) {
    return CarModel.findById(id);
  }

  async findMany(filter: Partial<ICar> = {}) {
    return CarModel.find(filter);
  }

  async aggregate(pipeline: PipelineStage[]) {
    return CarModel.aggregate(pipeline);
  }
}