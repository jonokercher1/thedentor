import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/services/user.service';
import { ICurrentUser } from '@/auth/types/current-user';
import { ApiKeyRepository } from '@/auth/repositories/api-key.repository';
import { ApiKeyFilters, ApiKeySelect } from '@/database/types/api-key';
import EntityNotFound from '@/common/errors/entity-not-found-error';
import InvalidApiKeyError from '../errors/invalid-api-key';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) { }

  public async getAccessToken(email: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    const payload: ICurrentUser = {
      id: user.id,
      email: user.email,
      role: user.roleName,
    };

    return this.jwtService.signAsync(payload);
  }

  public async decryptAccessToken(accessToken: string): Promise<ICurrentUser> {
    const payload = this.jwtService.decode(accessToken);

    return payload as ICurrentUser;
  }

  public async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey) throw new InvalidApiKeyError();

      const keyRecord = await this.apiKeyRepository.findFirst<ApiKeyFilters, ApiKeySelect>({
        key: apiKey,
        expiresAt: {
          gte: new Date(),
        },
      });

      if (!keyRecord) {
        throw new EntityNotFound('ApiKey');
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  public async getUserFromApiKey(apiKey: string): Promise<ICurrentUser> {
    const isApiKeyValid = await this.validateApiKey(apiKey);

    if (!isApiKeyValid) {
      throw new InvalidApiKeyError();
    }

    // TODO: maybe we want this in the data access layer to split data access logic from business logic 
    // Whatever is decided here should be consistent eveywhere
    const apiKeyRecord = await this.apiKeyRepository.findFirst<ApiKeyFilters, ApiKeySelect>({
      key: apiKey,
      expiresAt: {
        gte: new Date(),
      },
    }, {
      dentor: {
        select: {
          id: true,
          email: true,
          roleName: true,
        },
      },
    });

    return apiKeyRecord.dentor;
  }
}
