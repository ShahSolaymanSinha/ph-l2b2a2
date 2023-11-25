import TUser from './user.interface';
import User from './user.model';

// User Services: Database l2a2

// Creating an user
const createUserIntoDB = async (user: TUser) => {
  if (await User.mIsUserExists(user.userId, user.username, user.email)) {
    throw new Error('User already exists');
  }
  const result = await User.create(user);
  return result;
};

// Retrieving all users
const getAllUsers = async () => {
  const result = await User.find({}).projection({ username: 1 });
  return result;
};

// Exporting All User Services
const userServices = {
  createUserIntoDB,
  getAllUsers,
};

export default userServices;
