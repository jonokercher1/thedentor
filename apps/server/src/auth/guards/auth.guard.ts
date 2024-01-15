import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants';
import { CurrentUser } from '@/auth/types/current-user';
import { IS_PUBLIC_KEY } from '@/auth/guards/public.guard';
import { Reflector } from '@nestjs/core';
import SessionManager from '@/auth/utils/session-manager';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { REQUIRES_API_KEY_KEY } from './api-key.guard';
import { AuthService } from '@/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionManager: SessionManager,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const usesApiKeyAuth = this.reflector.getAllAndOverride<boolean>(REQUIRES_API_KEY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    if (usesApiKeyAuth) {
      try {
        const apiKey = request.headers['x-api-key'];
        await this.tryToSetUserFromApiKey(apiKey, request);

        return true;
      } catch (e) {
        this.logger.error('AuthGuard.canActivate', 'API Key Authentication Failed', e.message);

        throw new UnauthorizedException();
      }
    }

    const token = this.sessionManager.getSessionCookieFromRequest(request);

    if (isPublic) {
      try {
        await this.optionalySetUserFromToken(token, request);
      } catch { } // Fail silently as this is a public endpoint so a token is not required

      return true;
    }

    if (!token) throw new UnauthorizedException();

    try {
      await this.optionalySetUserFromToken(token, request);
    } catch (e) {
      this.logger.error('AuthGuard.canActivate', 'User Authentication Failed', e.message);

      throw new UnauthorizedException();
    }

    return true;
  }

  private async tryToGetPayloadFromToken(token: string) {
    return this.jwtService.verifyAsync<CurrentUser>(
      token,
      {
        secret: jwtConstants.secret,
      },
    );
  }

  private async optionalySetUserFromToken(token: string, request: any) {
    const payload = await this.tryToGetPayloadFromToken(token);

    request['user'] = payload;
  }

  private async tryToSetUserFromApiKey(apiKey: string, request: any) {
    const user = await this.authService.getUserFromApiKey(apiKey);

    request['user'] = user;
  }
}