import { Request, Response } from 'express';
import userServices from './user.services';
import UserValidationSchema from './user.validation';

const createAUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validateUser = UserValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(validateUser);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Exporting all user controller
const userController = {
  createAUser,
};

export default userController;
