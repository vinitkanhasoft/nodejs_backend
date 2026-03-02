import { Request, Response } from 'express';
import {
  ApiResponse,
  asyncHandler,
  AuthenticationError,
  ValidationError,
  ConflictError,
} from '../../../utils';
import { RegisterUseCase } from '../application/usecases/register.usecase';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { RefreshTokenUseCase } from '../application/usecases/refreshToken.usecase';
import { AuthService } from '../application/services/auth.service';
import { AuthRepository } from '../infrastructure/repositories/auth.repository';
import {
  Constants,
  HttpStatus,
  getSuccessMessage,
  getErrorMessage,
} from '../../../config';

const authRepo = new AuthRepository();
const authService = new AuthService(authRepo);

const registerUseCase = new RegisterUseCase(authService);
const loginUseCase = new LoginUseCase(authService);
const refreshUseCase = new RefreshTokenUseCase(authService);

export class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await registerUseCase.execute(req.body);
    
    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('CREATED'),
      HttpStatus.CREATED
    );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await loginUseCase.execute(req.body);
    
    if (!result) {
      throw new AuthenticationError(getErrorMessage('UNAUTHORIZED'));
    }

    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('RETRIEVED'),
      HttpStatus.OK
    );
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    
    if (!userId) {
      throw new ValidationError('User ID is required for token refresh');
    }

    const result = await refreshUseCase.execute(userId);
    
    if (!result) {
      throw new AuthenticationError(getErrorMessage('UNAUTHORIZED'));
    }

    return ApiResponse.success(
      res,
      result,
      getSuccessMessage('RETRIEVED'),
      HttpStatus.OK
    );
  });
}