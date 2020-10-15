import { Router } from 'express';
import userRoutes from '@modules/user/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/user/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
