import { AuthService } from '../services/auth.service';

export class RefreshTokenUseCase {
  constructor(private service: AuthService) {}

  async execute(userId: string) {
    return this.service.refreshToken(userId);
  }
}