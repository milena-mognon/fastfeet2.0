import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import auth from '@config/auth';
import IAuthTokenProvider from '@shared/container/providers/AuthTokenProvider/models/IAuthTokenProvider';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface ICredentials {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticationService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthTokenProvider')
    private authTokenProvider: IAuthTokenProvider,
  ) {}

  public async execute({ email, password }: ICredentials): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect credentials', 401);
    }

    const correctPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!correctPassword) {
      throw new AppError('Incorrect credentials', 401);
    }

    const token = this.authTokenProvider.createToken(user.id);
    return { user, token };
  }
}
