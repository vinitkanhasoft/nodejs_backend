import type { Request, Response } from 'express';
import { ApiResponse } from '../../../utils/ApiResponse.ts';
import { asyncHandler } from '../../../utils/asyncHandler.ts';
import { NotFoundError, ValidationError } from '../../../utils/errors.ts';
import { paginate, type PaginationOptions } from '../../../utils/pagination.ts';
import { CarService } from '../application/services/car.service.ts';
import { CreateCarUseCase } from '../application/usecases/createCar.usecase.ts';
import { UpdateCarUseCase } from '../application/usecases/updateCar.usecase.ts';
import { DeleteCarUseCase } from '../application/usecases/deleteCar.usecase.ts';
import { SearchCarsUseCase } from '../application/usecases/searchCars.usecase.ts';
import { AnalyticsUseCase } from '../application/usecases/analytics.usecase.ts';
import { CarRepository } from '../infrastructure/repositories/car.repository.ts';
import { Constants, getSuccessMessage, getErrorMessage } from '../../../config/index.ts';

const carRepo = new CarRepository();
const carService = new CarService(carRepo);

const createCarUseCase = new CreateCarUseCase(carService);
const updateCarUseCase = new UpdateCarUseCase(carService);
const deleteCarUseCase = new DeleteCarUseCase(carService);
const searchCarsUseCase = new SearchCarsUseCase(carService);
const analyticsUseCase = new AnalyticsUseCase(carService);

export class CarController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await createCarUseCase.execute(req.body);
    
    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('CREATED'),
      Constants.HttpStatus.CREATED
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw new ValidationError('Car ID is required');
    }

    const result = await updateCarUseCase.execute(id, req.body);
    
    if (!result.isSuccess) {
      if (result.error?.message.includes('not found')) {
        throw new NotFoundError('Car');
      }
      throw new ValidationError(result.error?.message || 'Failed to update car');
    }

    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('UPDATED'),
      Constants.HttpStatus.OK
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw new ValidationError('Car ID is required');
    }

    const result = await deleteCarUseCase.execute(id);
    
    if (!result.isSuccess) {
      if (result.error?.message.includes('not found')) {
        throw new NotFoundError('Car');
      }
      throw new ValidationError(result.error?.message || 'Failed to delete car');
    }

    return ApiResponse.success(
      res,
      null,
      getSuccessMessage('DELETED'),
      Constants.HttpStatus.OK
    );
  });

  search = asyncHandler(async (req: Request, res: Response) => {
    const { search, page = '1', limit = '10', sortBy, sortOrder } = req.query;
    
    const paginationOptions: PaginationOptions = {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
    };

    const result = await searchCarsUseCase.execute(search as string, {
      page: paginationOptions.page,
      limit: paginationOptions.limit,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
    });

    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('RETRIEVED'),
      Constants.HttpStatus.OK
    );
  });

  analytics = asyncHandler(async (req: Request, res: Response) => {
    const result = await analyticsUseCase.execute();
    
    if (!result.isSuccess) {
      throw new ValidationError(result.error?.message || 'Failed to get analytics');
    }

    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('RETRIEVED'),
      Constants.HttpStatus.OK
    );
  });
}