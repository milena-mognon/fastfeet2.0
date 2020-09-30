import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  create({
    name,
    email,
    cpf,
    password,
    deliveryman,
  }: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
