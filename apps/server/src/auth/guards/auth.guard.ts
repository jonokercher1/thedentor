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
import { IS_PUBLIC_KEY } from '@/common/guards/public.guard';
import { Reflector } from '@nestjs/core';
import SessionManager from '@/auth/utils/session-manager';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionManager: SessionManager,
    private readonly reflector: Reflector,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
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
}