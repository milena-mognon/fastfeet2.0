import { compare, hash } from 'bcrypt';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashed = await hash(payload, 8);
    return hashed;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
