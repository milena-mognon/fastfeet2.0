import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    cpf,
    deliveryman,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.create({
      name,
      cpf,
      email,
      deliveryman,
      password,
    });

    return user;
  }
}

export default CreateUserService;
