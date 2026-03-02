import bcrypt from 'bcryptjs';
import { UserEntity } from '../../domain/user.entity';
import { IUser } from '../../domain/auth.types';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';
import { env } from './../../../../config/env';
import { SignJWT } from 'jose';

export class AuthService {
  constructor(private repo: AuthRepository) {}

  async register(user: IUser): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.repo.create({ ...user, password: hashedPassword });
    return new UserEntity(createdUser);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(env.jwtExpiresIn || '1h')
      .sign(new TextEncoder().encode(env.jwtSecret));

    return { user, token };
  }

  async refreshToken(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('User not found');

    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(env.jwtExpiresIn || '1h')
      .sign(new TextEncoder().encode(env.jwtSecret));

    return token;
  }
}