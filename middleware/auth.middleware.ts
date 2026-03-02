import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ApiResponse, AuthenticationError, AuthorizationError } from '../utils';
import { IRequest } from '../core/types/request.types';
import { logger } from '../config/logger';

export const authMiddleware = (roles: string[] = []) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ApiResponse.error(
          res,
          'Authorization token is required',
          401
        );
      }

      const token = authHeader.split(' ')[1];
      
      // Verify JWT token
      const decoded = jwt.verify(token, config.jwt.secret) as { id: string; role: string };
      
      // Attach user to request
      req.user = { 
        id: decoded.id, 
        role: decoded.role
      };

      // Check role-based authorization
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return ApiResponse.error(
          res,
          'Insufficient permissions',
          403
        );
      }

      next();
    } catch (err) {
      logger.error('Authentication error:', err);
      
      if (err instanceof jwt.TokenExpiredError) {
        return ApiResponse.error(
          res,
          'Token has expired',
          401
        );
      }
      
      if (err instanceof jwt.JsonWebTokenError) {
        return ApiResponse.error(
          res,
          'Invalid token',
          401
        );
      }

      return ApiResponse.error(
        res,
        'Authentication failed',
        401
      );
    }
  };
};

export const optionalAuth = () => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret) as { id: string; role: string };
      
      req.user = { 
        id: decoded.id, 
        role: decoded.role
      };

      next();
    } catch (err) {
      // For optional auth, we just continue if token is invalid
      next();
    }
  };
};
