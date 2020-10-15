import { container } from 'tsyringe';
import JWTProvider from './implementations/JWTProvider';
import IAuthTokenProvider from './models/IAuthTokenProvider';

container.registerSingleton<IAuthTokenProvider>(
  'AuthTokenProvider',
  JWTProvider,
);
