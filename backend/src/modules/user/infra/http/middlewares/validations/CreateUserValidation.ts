import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export default async function CreateUserValidation(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup
      .string()
      .matches(
        RegExp('/^d{3}.d{3}.d{3}-d{2}$/'),
        'cpf must follow the correct format',
      )
      .required(),
    deliveryman: yup.boolean(),
    password: yup.string().required(),
  });

  try {
    await schema.validate(request.body, { abortEarly: false, strict: true });
    return next();
  } catch (err) {
    return response.status(400).json({ error: err.errors });
  }
}
