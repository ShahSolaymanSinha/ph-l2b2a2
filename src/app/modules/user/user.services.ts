import config from '../../config';
import TUser from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';

// User Services: Database l2a2

// Creating an user
const createUserIntoDB = async (user: TUser) => {
  if (
    await User.mIsUserExists({
      userId: user.userId,
      username: user.username,
      email: user.email,
    })
  ) {
    throw new Error('User already exists').toString();
  }
  const result = await User.create(user);
  return result;
};

// Retrieving all users
const getAllUsers = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

// User specific user data
const getSpecificUser = async (userId: number) => {
  const result = await User.mIsUserExists({
    userId,
  });
  if (!result) {
    throw new Error('User not found').message;
  }
  return result;
};

// Update user
const updateUserService = async (userId: number, userData: TUser) => {
  const isUserExists = await User.mIsUserExists({ userId });
  if (!isUserExists) {
    throw new Error('User not found').message;
  }
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt),
  );
  const result = await User.replaceOne({ userId }, userData);
  return result;
};

// Exporting All User Services
const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSpecificUser,
  updateUserService,
};

export default userServices;
