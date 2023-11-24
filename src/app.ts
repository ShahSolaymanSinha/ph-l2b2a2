import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRouter from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'You are connected successfully',
      data: [],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: [],
    });
  }
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: [],
  });
});

export default app;
