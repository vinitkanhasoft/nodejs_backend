// modules/auth/application/services/auth.service.ts
import { UserEntity } from '../../domain/user.entity.ts';
import type { IUser } from '../../domain/auth.types.ts';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository.ts';
import { config } from './../../../../config/index.ts';
import { hashPassword, comparePassword } from './../../../../utils/crypto.ts';
import jwt from 'jsonwebtoken';
import type { SignOptions, Secret } from 'jsonwebtoken';

export class AuthService {
  private repo: AuthRepository;

  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  // Register a new user
  async register(user: IUser): Promise<UserEntity> {
    const hashedPassword = await hashPassword(user.password);
    const createdUser = await this.repo.create({ ...user, password: hashedPassword });
    return new UserEntity(createdUser);
  }

  // Login user and return JWT
  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const secret: Secret = config.jwt.secret as string;
    const options: SignOptions = { expiresIn: config.jwt.expiresIn as string | number };

    const token = jwt.sign({ id: user._id, role: user.role }, secret, options);

    return { user, token };
  }

  // Refresh JWT token
  async refreshToken(userId: string): Promise<string> {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('User not found');

    const secret: Secret = config.jwt.secret as string;
    const options: SignOptions = { expiresIn: config.jwt.expiresIn as string | number };

    return jwt.sign({ id: user._id, role: user.role }, secret, options);
  }
}