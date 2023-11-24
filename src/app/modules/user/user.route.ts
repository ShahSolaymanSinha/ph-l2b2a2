import express, { Router } from 'express';
import userController from './user.controller';

const userRouter: Router = express.Router();

userRouter.post('/create-user', userController.createAUser);

export default userRouter;
