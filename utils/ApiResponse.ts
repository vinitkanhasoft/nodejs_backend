import { Response } from 'express';

export class ApiResponse {
  // Generic success response
  static success<T = unknown>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  // Generic error response
  static error<E = unknown>(
    res: Response,
    message: string = 'Error',
    statusCode: number = 500,
    errors?: E
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}