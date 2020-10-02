import { container } from 'tsyringe';

import './providers/HashProvider';

import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/user/repositories/IUsersRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
