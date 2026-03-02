import { CarService } from '../services/car.service';
import { carSearchPipeline, carFilterPipeline } from '../../infrastructure/pipelines';
import { ICar } from '../../domain/car.types';
import { PipelineStage } from 'mongoose';

export class SearchCarsUseCase {
  constructor(private service: CarService) {}

  execute(searchTerm: string, filters: Partial<ICar> = {}) {
    const pipeline: PipelineStage[] = [
      ...carSearchPipeline(searchTerm),
      ...carFilterPipeline(filters),
    ];
    return this.service.aggregate(pipeline);
  }
}