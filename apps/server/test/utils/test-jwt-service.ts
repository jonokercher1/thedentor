import { fakerEN as faker } from '@faker-js/faker';
import { RoleName } from '@prisma/client';
import { ICurrentUser } from '@/auth/types/current-user';
import * as jwt from 'jsonwebtoken';

export default class TestJwtService {
  private readonly secret: string = 'secret';

  public async generateAccessToken(dataOverrides?: Partial<ICurrentUser>, expiresIn = '24h'): Promise<string> {
    const payload: ICurrentUser = {
      id: dataOverrides?.id ?? faker.string.uuid(),
      email: dataOverrides?.email ?? faker.internet.email(),
      role: dataOverrides?.role ?? RoleName.Dentist,
    };

    return jwt.sign(payload, this.secret, { expiresIn });
  }
}