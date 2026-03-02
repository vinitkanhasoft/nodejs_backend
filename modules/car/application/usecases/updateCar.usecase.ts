import { CarService } from '../services/car.service';
import { ICar } from '../../domain/car.types';

export class UpdateCarUseCase {
  constructor(private service: CarService) {}

  execute(id: string, data: Partial<ICar>) {
    return this.service.update(id, data);
  }
}