import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';

export class LoginUseCase {
  constructor(private service: AuthService) {}

  async execute(input: LoginDTO) {
    return this.service.login(input.email, input.password);
  }
}