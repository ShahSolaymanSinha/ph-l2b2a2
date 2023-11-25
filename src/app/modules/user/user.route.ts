import express, { Router } from 'express';
import userController from './user.controller';

const userRouter: Router = express.Router();

userRouter.post('/', userController.createAUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getSpecificUserByUserId);

userRouter.put('/:userId', userController.updateUserController);

export default userRouter;
