import { UserModel } from '../schemas/user.schema.ts';
import type { IUser } from '../../domain/auth.types.ts';

export class AuthRepository {
  async create(user: IUser) {
    return UserModel.create(user);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }
}