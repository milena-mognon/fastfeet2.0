import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUserRepository from '@modules/user/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        cpf,
      },
    });
  }

  public async create({
    name,
    email,
    cpf,
    password,
    deliveryman,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      cpf,
      password,
      deliveryman,
    });
    await this.ormRepository.save(user);

    return user;
  }

  public save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
