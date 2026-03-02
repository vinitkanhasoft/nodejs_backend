import { Schema, model } from 'mongoose';
import type { IUser } from '../../domain/auth.types.ts';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema);