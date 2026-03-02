import { CarService } from '../services/car.service.ts';
import { carAnalyticsPipeline } from '../../infrastructure/pipelines/index.ts';

export class AnalyticsUseCase {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  execute() {
    return this.service.aggregate(carAnalyticsPipeline());
  }
}