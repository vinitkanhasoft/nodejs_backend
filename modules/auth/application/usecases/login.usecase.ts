import { AuthService } from '../services/auth.service.ts';
import type { LoginDTO } from '../dto/login.dto.ts';

export class LoginUseCase {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  async execute(input: LoginDTO) {
    return this.service.login(input.email, input.password);
  }
}