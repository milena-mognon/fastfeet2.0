import CreateUserService from '@modules/user/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, deliveryman, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      cpf,
      email,
      deliveryman,
      password,
    });

    return response.json(user);
  }
}

export default new UserController();
