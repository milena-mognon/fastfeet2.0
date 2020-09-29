import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // if is AppError answer with the correct status and message
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // print the error on terminal
  console.error(err);

  // if an error happens without custom message, it answer with generic 500 error
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
