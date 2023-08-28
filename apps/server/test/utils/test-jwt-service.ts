import { fakerEN as faker } from '@faker-js/faker';
import { RoleName } from '@prisma/client';
import { CurrentUser } from '@/auth/types/current-user';
import * as jwt from 'jsonwebtoken';

export default class TestJwtService {
  private readonly secret: string = 'secret';

  public async generateAccessToken(dataOverrides?: Partial<CurrentUser>, expiresIn = '24h'): Promise<string> {
    const payload: CurrentUser = {
      id: dataOverrides?.id ?? faker.string.uuid(),
      email: dataOverrides?.email ?? faker.internet.email(),
      role: dataOverrides?.role ?? RoleName.Dentist,
    };

    return jwt.sign(payload, this.secret, { expiresIn });
  }
}