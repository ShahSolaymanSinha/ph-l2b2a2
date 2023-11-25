import { Request, Response } from 'express';
import userServices from './user.services';
import UserValidationSchema from './user.validation';

// Create User Controller
const userCreateController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validateUser = UserValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(validateUser);
    if (result) {
      successResponse({
        message: 'User created successfully',
        data: result,
        res,
      });
    }
  } catch (err) {
    errorResponse({
      error: err,
      res,
    });
  }
};

// Get All User Controller
const allUserGetController = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    successResponse({
      message: 'Users fetched successfully',
      data: result,
      res,
    });
  } catch (err) {
    errorResponse({
      error: err,
      res,
    });
  }
};

// Get User Controller
const userGetController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSpecificUser(Number(userId));
    successResponse({
      message: 'User fetched successfully!',
      data: result,
      res,
    });
  } catch (err) {
    errorResponse({
      message: 'User not found',
      error: { code: 404, description: err },
      res,
    });
  }
};

// User Update Controller
const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userServices.updateUserService(
      Number(userId),
      userData,
    );
    successResponse({
      message: 'User updated successfully',
      data: result,
      res,
    });
  } catch (err) {
    errorResponse({
      message: 'User not found',
      error: { code: 404, description: err },
      res,
    });
  }
};

// User Delete Controller
const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.userDeleteService(Number(userId));
    successResponse({
      message: 'User deleted successfully',
      data: null,
      res,
    });
  } catch (err) {
    errorResponse({
      message: 'User not found',
      error: { code: 404, description: err },
      res,
    });
  }
};

// User Orders Update Controller
const userOrdersUpdateController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    await userServices.userUpdateOrdersService(Number(userId), order);
    successResponse({
      message: 'Order created successfully!',
      data: null,
      res,
    });
  } catch (err) {
    errorResponse({
      message: 'User not found',
      error: { code: 404, description: err },
      res,
    });
  }
};

// User get all orders controller
const userGetAllOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.userGetAllOrders(Number(userId));
    successResponse({
      message: 'Orders fetched successfully!',
      data: result,
      res,
    });
  } catch (err) {
    errorResponse({
      message: 'User not found',
      error: { code: 404, description: err },
      res,
    });
  }
};

// User get all orders total controller
const userGetOrdersTotalController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.userGetOrdersTotalService(Number(userId));
    successResponse({
      message: 'Orders fetched successfully!',
      data: result,
      res,
    });
  } catch (err) {
    errorResponse({
      message: 'User not found',
      error: { code: 404, description: err },
      res,
    });
  }
};

// Success response function
const successResponse = (params: {
  message?: string;
  data: unknown;
  res: Response;
  statusCode?: number;
}) => {
  return params.res.status(params.statusCode || 200).json({
    success: true,
    message: params.message || 'Job successfully completed',
    data: params.data,
  });
};

// Error response function
const errorResponse = (params: {
  message?: string;
  error: unknown;
  res: Response;
  statusCode?: number;
}) => {
  return params.res.status(params.statusCode || 500).json({
    success: false,
    message: params.message || 'Something went wrong',
    error: params.error,
  });
};

// Exporting all user controller
const userController = {
  createAUser: userCreateController,
  getAllUsers: allUserGetController,
  getSpecificUserByUserId: userGetController,
  updateUserController: userUpdateController,
  userDeleteController,
  userOrdersUpdateController,
  userGetAllOrdersController,
  userGetOrdersTotalController,
};

export default userController;
