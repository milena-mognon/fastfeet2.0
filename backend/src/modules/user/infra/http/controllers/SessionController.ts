import AuthenticationService from '@modules/user/services/AuthenticationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const auth = container.resolve(AuthenticationService);

    const { user, token } = await auth.execute({ email, password });

    return res.json({ user, token });
  }
}

export default new SessionController();
