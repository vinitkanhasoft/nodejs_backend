import { IUser } from '../../domain/auth.types';
import { UserEntity } from '../../domain/user.entity';

export const toEntity = (data: IUser): UserEntity => new UserEntity(data);