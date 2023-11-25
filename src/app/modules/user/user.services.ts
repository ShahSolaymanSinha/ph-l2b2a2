import config from '../../config';
import TUser from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';

// User Services: Database l2a2

// Creating an user
const createUserIntoDBService = async (user: TUser) => {
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
const getAllUserService = async () => {
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
const getUserService = async (userId: number) => {
  const result = await User.mIsUserExists({
    userId,
  });
  if (!result) {
    throw new Error('User not found').message;
  } else {
    const newResult = await User.aggregate([
      { $match: { userId: userId } },
      {
        $project: {
          _id: 0,
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          hobbies: 1,
          address: 1,
        },
      },
    ]);
    return newResult[0];
  }
};

// Update user
const userUpdateService = async (userId: number, userData: TUser) => {
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

// Delete User Service
const userDeleteService = async (userId: number) => {
  const isUserExists = await User.mIsUserExists({ userId });
  if (!isUserExists) {
    throw new Error('User not found').message;
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// User Orders Update Service
interface IUpdateOrders {
  productName: string;
  price: number;
  quantity: number;
}
const userUpdateOrdersService = async (
  userId: number,
  order: IUpdateOrders,
) => {
  const isUserExists = await User.mIsUserExists({ userId });
  if (!isUserExists) {
    throw new Error('User not found').message;
  }
  const result = await User.updateOne({ userId }, { $push: { orders: order } });
  return result;
};

// Retrieve all orders
const userGetAllOrders = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId: userId } },
    {
      $project: {
        _id: 0,
        orders: 1,
      },
    },
  ]);
  return result[0];
};

// Exporting All User Services
const userServices = {
  createUserIntoDB: createUserIntoDBService,
  getAllUsers: getAllUserService,
  getSpecificUser: getUserService,
  updateUserService: userUpdateService,
  userDeleteService,
  userUpdateOrdersService,
  userGetAllOrders,
};

export default userServices;
