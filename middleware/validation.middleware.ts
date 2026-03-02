import type { Request, Response, NextFunction } from 'express';
import { validateSchema, type ValidationRule, sanitizeInput } from '../utils/index.ts';
import { ApiResponse, ValidationError as ValidationErrorClass } from '../utils/index.ts';

export const validate = (schema: Record<string, ValidationRule>, target: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[target];
      
      // Sanitize input data
      const sanitizedData = sanitizeInput(data);
      
      // Validate the data
      const result = validateSchema(sanitizedData, schema);
      
      if (!result.isValid) {
        const errorMessages = result.errors.map(error => error.message);
        return ApiResponse.error(
          res,
          'Validation failed',
          400,
          {
            errors: errorMessages,
            details: result.errors.map(error => ({
              field: error.details?.[0]?.field || 'unknown',
              message: error.details?.[0]?.message || error.message,
            })),
          }
        );
      }
      
      // Update request with validated and sanitized data
      req[target] = sanitizedData;
      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      return ApiResponse.error(
        res,
        'Validation error',
        500,
        error instanceof Error ? error.message : 'Unknown validation error'
      );
    }
  };
};

export const validateBody = (schema: Record<string, ValidationRule>) => validate(schema, 'body');
export const validateQuery = (schema: Record<string, ValidationRule>) => validate(schema, 'query');
export const validateParams = (schema: Record<string, ValidationRule>) => validate(schema, 'params');