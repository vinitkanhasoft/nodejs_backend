import { Request, Response } from 'express';
import { CarService } from '../application/services/car.service';
import { CreateCarUseCase } from '../application/usecases/createCar.usecase';
import { UpdateCarUseCase } from '../application/usecases/updateCar.usecase';
import { DeleteCarUseCase } from '../application/usecases/deleteCar.usecase';
import { SearchCarsUseCase } from '../application/usecases/searchCars.usecase';
import { AnalyticsUseCase } from '../application/usecases/analytics.usecase';
import { CarRepository } from '../infrastructure/repositories/car.repository';

const carRepo = new CarRepository();
const carService = new CarService(carRepo);

const createCarUseCase = new CreateCarUseCase(carService);
const updateCarUseCase = new UpdateCarUseCase(carService);
const deleteCarUseCase = new DeleteCarUseCase(carService);
const searchCarsUseCase = new SearchCarsUseCase(carService);
const analyticsUseCase = new AnalyticsUseCase(carService);

export class CarController {
  async create(req: Request, res: Response) {
    const car = await createCarUseCase.execute(req.body);
    res.status(201).json({ success: true, data: car });
  }

  async update(req: Request, res: Response) {
    const car = await updateCarUseCase.execute(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: car });
  }

  async delete(req: Request, res: Response) {
    await deleteCarUseCase.execute(req.params.id as string);
    res.status(200).json({ success: true, message: 'Car deleted' });
  }

  async search(req: Request, res: Response) {
    const cars = await searchCarsUseCase.execute(req.query.search as string, req.query);
    res.status(200).json({ success: true, data: cars });
  }

  async analytics(req: Request, res: Response) {
    const data = await analyticsUseCase.execute();
    res.status(200).json({ success: true, data });
  }
}