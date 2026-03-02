import { CarService } from '../services/car.service';

export class DeleteCarUseCase {
  constructor(private service: CarService) {}

  execute(id: string) {
    return this.service.delete(id);
  }
}