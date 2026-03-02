import { AuthService } from '../services/auth.service';
import { RegisterDTO } from '../dto/register.dto';

export class RegisterUseCase {
  constructor(private service: AuthService) {}

  async execute(input: RegisterDTO) {
    return this.service.register({
      ...input,
      role: input.role || 'user',
    });
  }
}