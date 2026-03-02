import { CarService } from '../services/car.service';
import { ICar } from '../../domain/car.types';

export class CreateCarUseCase {
  constructor(private service: CarService) {}

  execute(data: ICar) {
    return this.service.create(data);
  }
}