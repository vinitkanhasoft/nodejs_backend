import { IUser } from './auth.types';

export class UserEntity {
  private data: IUser;
  isSuccess: any;
  error: any;

  constructor(data: IUser) {
    this.data = data;
  }

  get value(): IUser {
    return this.data;
  }

  updatePassword(password: string) {
    this.data.password = password;
  }

  updateRole(role: string) {
    this.data.role = role;
  }
}