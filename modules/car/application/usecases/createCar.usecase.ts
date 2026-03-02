import { CarService } from '../services/car.service.ts';
import type { ICar } from '../../domain/car.types.ts';

export class CreateCarUseCase {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  execute(data: ICar) {
    return this.service.create(data);
  }
}