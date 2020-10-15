import jwt from 'jsonwebtoken';
import auth from '@config/auth';

import IAuthTokenProvider from '../models/IAuthTokenProvider';

export default class AuthTokenProvider implements IAuthTokenProvider {
  public createToken(subject?: string): string {
    const { secretKey, expiresIn } = auth;

    const token = jwt.sign({}, secretKey, { expiresIn, subject });

    return token;
  }
}
