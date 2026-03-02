import { CarService } from '../services/car.service.ts';
import { carSearchPipeline, carFilterPipeline } from '../../infrastructure/pipelines/index.ts';
import type { ICar } from '../../domain/car.types.ts';
import type { PipelineStage } from 'mongoose';

export class SearchCarsUseCase {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  execute(searchTerm: string, filters: Partial<ICar> = {}) {
    const pipeline: PipelineStage[] = [
      ...carSearchPipeline(searchTerm),
      ...carFilterPipeline(filters),
    ];
    return this.service.aggregate(pipeline);
  }
}