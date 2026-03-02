// auth/domain/user.entity.ts

// ✅ Import only the type
import type { IUser } from './auth.types.ts';

export class UserEntity {
  private data: IUser;
  isSuccess: any;
  error: any;

  constructor(data: IUser) {
    this.data = data;
  }

  // Getter for the underlying data
  get value(): IUser {
    return this.data;
  }

  // Update the password
  updatePassword(password: string) {
    this.data.password = password;
  }

  // Update the role
  updateRole(role: string) {
    this.data.role = role;
  }
}