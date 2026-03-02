import { UserEntity } from '../../domain/user.entity';
import { IUser } from '../../domain/auth.types';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';
import { config } from './../../../../config';
import { hashPassword, comparePassword } from './../../../../utils/crypto';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private repo: AuthRepository) {}

  async register(user: IUser): Promise<UserEntity> {
    const hashedPassword = await hashPassword(user.password);
    const createdUser = await this.repo.create({ ...user, password: hashedPassword });
    return new UserEntity(createdUser);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return { user, token };
  }

  async refreshToken(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('User not found');

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return token;
  }
}