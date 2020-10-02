import { Router } from 'express';
import userRoutes from '@modules/user/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', userRoutes);

export default routes;
