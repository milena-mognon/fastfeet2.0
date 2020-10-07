import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import CreateUserValidation from '../middlewares/validations/CreateUserValidation';

const usersRouter = Router();

usersRouter.post('/', CreateUserValidation, UsersController.create);

export default usersRouter;
