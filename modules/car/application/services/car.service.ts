import { CarRepository } from '../../infrastructure/repositories/car.repository.ts';
import type { ICar } from '../../domain/car.types.ts';
import type { PipelineStage } from 'mongoose';

export class CarService {
  private repo: CarRepository;

  constructor(repo: CarRepository) {
    this.repo = repo;
  }

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