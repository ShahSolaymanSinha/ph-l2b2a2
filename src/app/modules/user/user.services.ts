import TUser from './user.interface';
import UserModel from './user.model';

// User Services: Database l2a2

// Creating an user
const createUserIntoDB = async (user: TUser) => {
  try {
    const result = await UserModel.create(user);
    return result;
  } catch (error) {
    return error;
  }
};


// Exporting All User Services
const userServices = {
  createUserIntoDB,
};

export default userServices;
