import { CarService } from '../services/car.service.ts';

export class DeleteCarUseCase {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  execute(id: string) {
    return this.service.delete(id);
  }
}