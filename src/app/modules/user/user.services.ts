import TUser from './user.interface';
import User from './user.model';

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

// Exporting All User Services
const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSpecificUser,
};

export default userServices;
