import express, { Router } from 'express';
import userController from './user.controller';

const userRouter: Router = express.Router();

userRouter.post('/', userController.createAUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getSpecificUserByUserId);

userRouter.put('/:userId', userController.updateUserController);

userRouter.delete('/:userId', userController.userDeleteController);

userRouter.put('/:userId/orders', userController.userOrdersUpdateController);

userRouter.get('/:userId/orders', userController.userGetAllOrdersController);

userRouter.get(
  '/:userId/orders/total-price',
  userController.userGetOrdersTotalController,
);

export default userRouter;
