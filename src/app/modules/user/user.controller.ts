import { Request, Response } from 'express';
import userServices from './user.services';

const createAUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUserIntoDB(req.body);
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
