import { CarEntity } from '../../domain/car.entity';
import { ICar } from '../../domain/car.types';

export const toEntity = (data: ICar): CarEntity => new CarEntity(data);