import { CarService } from '../services/car.service';
import { carAnalyticsPipeline } from '../../infrastructure/pipelines';

export class AnalyticsUseCase {
  constructor(private service: CarService) {}

  execute() {
    return this.service.aggregate(carAnalyticsPipeline());
  }
}