import { UserModel } from '../../modules/auth/infrastructure/schemas/user.schema';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const exists = await UserModel.findOne({ email: 'admin@example.com' });
  if (exists) return;

  const password = await bcrypt.hash('password123', 10);
  await UserModel.create({
    email: 'admin@example.com',
    password,
    role: 'admin',
  });

  console.log('User seeder finished');
};
