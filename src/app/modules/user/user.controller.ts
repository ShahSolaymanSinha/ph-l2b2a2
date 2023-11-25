import { Request, Response } from 'express';
import userServices from './user.services';
import UserValidationSchema from './user.validation';

const createAUser = async (req: Request, res: Response) => {
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

const getAllUsers = async (req: Request, res: Response) => {
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

// get specific user by id
const getSpecificUserByUserId = async (req: Request, res: Response) => {
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
  createAUser,
  getAllUsers,
  getSpecificUserByUserId,
};

export default userController;
