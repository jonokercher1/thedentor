import { fakerEN as faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { RoleName } from '@prisma/client';
import { CurrentUser } from '../../src/auth/types/CurrentUser';

export default class TestJwtService {
  private readonly secret: string = 'secret';

  // TODO: decide if we want to rely on prod code in tests
  constructor(private readonly jwtService: JwtService) { }

  public async generateAccessToken(dataOverrides?: Partial<CurrentUser>, expiresIn = '24h'): Promise<string> {
    const payload: CurrentUser = {
      id: dataOverrides?.id ?? faker.datatype.uuid(),
      email: dataOverrides?.email ?? faker.internet.email(),
      role: dataOverrides?.role ?? RoleName.Dentist,
    };

    return this.jwtService.sign(payload, { expiresIn, secret: this.secret });
  }
}