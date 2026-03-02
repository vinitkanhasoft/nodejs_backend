import { CarRepository } from '../../infrastructure/repositories/car.repository';
import { ICar } from '../../domain/car.types';
import { PipelineStage } from 'mongoose';

export class CarService {
  constructor(private repo: CarRepository) {}

  create(data: ICar) {
    return this.repo.create(data);
  }

  update(id: string, data: Partial<ICar>) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  search(filter: Partial<ICar> = {}) {
    // Use Partial<ICar> for safer type checking instead of any
    return this.repo.findMany(filter);
  }

  aggregate(pipeline: PipelineStage[] = []) {
    return this.repo.aggregate(pipeline);
  }
}