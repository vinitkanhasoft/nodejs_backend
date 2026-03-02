import { HttpStatus } from '../config/constants.ts';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    code?: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public readonly validationErrors: any[];

  constructor(message: string, validationErrors: any[] = []) {
    super(message, HttpStatus.BAD_REQUEST, true, 'VALIDATION_ERROR', {
      validationErrors,
    });
    this.validationErrors = validationErrors;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, HttpStatus.NOT_FOUND, true, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED, true, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, HttpStatus.FORBIDDEN, true, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, HttpStatus.CONFLICT, true, 'CONFLICT');
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, true, 'DATABASE_ERROR', details);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string = 'External service error') {
    super(`${service}: ${message}`, HttpStatus.SERVICE_UNAVAILABLE, true, 'EXTERNAL_SERVICE_ERROR');
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, HttpStatus.TOO_MANY_REQUESTS, true, 'RATE_LIMIT_ERROR');
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, HttpStatus.UNAUTHORIZED, true, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, HttpStatus.FORBIDDEN, true, 'AUTHORIZATION_ERROR');
  }
}

export class TokenError extends AppError {
  constructor(message: string = 'Token error') {
    super(message, HttpStatus.UNAUTHORIZED, true, 'TOKEN_ERROR');
  }
}

export class FileUploadError extends AppError {
  constructor(message: string = 'File upload error') {
    super(message, HttpStatus.BAD_REQUEST, true, 'FILE_UPLOAD_ERROR');
  }
}

export class EmailError extends AppError {
  constructor(message: string = 'Email sending error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, true, 'EMAIL_ERROR');
  }
}

export class CacheError extends AppError {
  constructor(message: string = 'Cache error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, true, 'CACHE_ERROR');
  }
}

export const createError = (
  message: string,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  code?: string,
  details?: any
): AppError => {
  return new AppError(message, statusCode, true, code, details);
};

export const isOperationalError = (error: Error): boolean => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

export const getErrorStatusCode = (error: Error): number => {
  if (error instanceof AppError) {
    return error.statusCode;
  }
  return HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorCode = (error: Error): string | undefined => {
  if (error instanceof AppError) {
    return error.code;
  }
  return undefined;
};

export const getErrorDetails = (error: Error): any => {
  if (error instanceof AppError) {
    return error.details;
  }
  return undefined;
};

export const formatErrorForResponse = (error: Error) => {
  const statusCode = getErrorStatusCode(error);
  const code = getErrorCode(error);
  const details = getErrorDetails(error);
  const message = error.message;

  const response: any = {
    success: false,
    message,
    statusCode,
  };

  if (code) {
    response.code = code;
  }

  if (details) {
    response.details = details;
  }

  // In development, include stack trace
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  return response;
};

export const handleAsyncError = async <T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error as Error];
  }
};

export const throwIf = (condition: boolean, error: Error): void => {
  if (condition) {
    throw error;
  }
};

export const throwIfNull = <T>(value: T | null | undefined, error: Error): T => {
  if (value === null || value === undefined) {
    throw error;
  }
  return value;
};

export const throwIfEmpty = (value: any, error: Error): void => {
  if (value === null || value === undefined || value === '') {
    throw error;
  }
};

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorHandlers: Map<string, (error: Error) => void> = new Map();

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public registerHandler(errorType: string, handler: (error: Error) => void): void {
    this.errorHandlers.set(errorType, handler);
  }

  public handleError(error: Error): void {
    const errorType = error.constructor.name;
    const handler = this.errorHandlers.get(errorType);

    if (handler) {
      handler(error);
    } else {
      this.defaultErrorHandler(error);
    }
  }

  private defaultErrorHandler(error: Error): void {
    console.error('Unhandled error:', error);
    // You can add logging service integration here
  }
}

export const errorHandler = ErrorHandler.getInstance();
