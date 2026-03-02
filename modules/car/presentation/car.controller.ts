import { Request, Response } from 'express';
import { ApiResponse, asyncHandler, NotFoundError, ValidationError, paginate, type PaginationOptions } from '../../../utils';
import { CarService } from '../application/services/car.service';
import { CreateCarUseCase } from '../application/usecases/createCar.usecase';
import { UpdateCarUseCase } from '../application/usecases/updateCar.usecase';
import { DeleteCarUseCase } from '../application/usecases/deleteCar.usecase';
import { SearchCarsUseCase } from '../application/usecases/searchCars.usecase';
import { AnalyticsUseCase } from '../application/usecases/analytics.usecase';
import { CarRepository } from '../infrastructure/repositories/car.repository';
import { Constants, getSuccessMessage, getErrorMessage } from '../../../config';

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
    
    if (!result.isSuccess) {
      throw new ValidationError(result.error?.message || 'Failed to create car');
    }

    return ApiResponse.success(
      res,
      result.value,
      getErrorMessage('CREATED'),
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
      result.value,
      getErrorMessage('UPDATED'),
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
      getErrorMessage('DELETED'),
      Constants.HttpStatus.OK
    );
  });

  search = asyncHandler(async (req: Request, res: Response) => {
    const { search, page = '1', limit = '10', sortBy, sortOrder } = req.query;
    
    const paginationOptions: PaginationOptions = {
      page: parseInt(page as string) || Constants.PAGINATION.DEFAULT_PAGE,
      limit: parseInt(limit as string) || Constants.PAGINATION.DEFAULT_LIMIT,
    };

    const searchParams = {
      search: search as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      ...paginationOptions,
    };

    const result = await searchCarsUseCase.execute(searchParams);
    
    if (!result.isSuccess) {
      throw new ValidationError(result.error?.message || 'Search failed');
    }

    // Apply pagination if result is an array
    const paginatedData = Array.isArray(result.value) 
      ? paginate(result.value, paginationOptions.page, paginationOptions.limit)
      : result.value;

    return ApiResponse.success(
      res,
      paginatedData,
      getErrorMessage('RETRIEVED'),
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
      result.value,
      getErrorMessage('RETRIEVED'),
      Constants.HttpStatus.OK
    );
  });
}