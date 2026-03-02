import { AuthService } from '../services/auth.service.ts';
import type { RegisterDTO } from '../dto/register.dto.ts';

export class RegisterUseCase {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  async execute(input: RegisterDTO) {
    return this.service.register({
      ...input,
      role: input.role || 'user',
    });
  }
}