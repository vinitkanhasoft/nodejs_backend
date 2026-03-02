import { CarService } from '../services/car.service.ts';
import type { ICar } from '../../domain/car.types.ts';

export class UpdateCarUseCase {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  execute(id: string, data: Partial<ICar>) {
    return this.service.update(id, data);
  }
}