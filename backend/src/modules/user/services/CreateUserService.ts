import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    cpf,
    deliveryman,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkCpf = await this.userRepository.findByCpf(cpf);

    if (checkCpf) {
      throw new AppError('This CPF is already in use');
    }

    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('This Email is already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      cpf,
      email,
      deliveryman,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
