import { UserModel } from '../schemas/user.schema';

export const createUserIndexes = async () => {
  await UserModel.createIndexes();
};