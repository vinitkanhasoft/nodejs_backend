import { AuthService } from '../services/auth.service.ts';

export class RefreshTokenUseCase {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  async execute(userId: string) {
    return this.service.refreshToken(userId);
  }
}