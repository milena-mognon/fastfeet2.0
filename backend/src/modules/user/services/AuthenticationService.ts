import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
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
  ) {}

  public async execute({ email, password }: ICredentials): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect credentials');
    }

    const correctPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!correctPassword) {
      throw new AppError('Incorrect credentials');
    }

    const token = jwt.sign({}, 'teste', { expiresIn: '1d' });

    return { user, token };
  }
}
