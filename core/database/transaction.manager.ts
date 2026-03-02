import mongoose from 'mongoose';

export const runTransaction = async (
  fn: (session: mongoose.ClientSession) => Promise<void>,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await fn(session);
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
