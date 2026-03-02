import { Request, Response } from 'express';
import { RegisterUseCase } from '../application/usecases/register.usecase';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { RefreshTokenUseCase } from '../application/usecases/refreshToken.usecase';
import { AuthService } from '../application/services/auth.service';
import { AuthRepository } from '../infrastructure/repositories/auth.repository';

const authRepo = new AuthRepository();
const authService = new AuthService(authRepo);

const registerUseCase = new RegisterUseCase(authService);
const loginUseCase = new LoginUseCase(authService);
const refreshUseCase = new RefreshTokenUseCase(authService);

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await registerUseCase.execute(req.body);
      res.status(201).json({ success: true, data: user.value });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      res.status(400).json({ success: false, message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await loginUseCase.execute(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      res.status(401).json({ success: false, message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const token = await refreshUseCase.execute(req.body.userId);
      res.status(200).json({ success: true, token });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Token refresh failed';
      res.status(400).json({ success: false, message });
    }
  }
}