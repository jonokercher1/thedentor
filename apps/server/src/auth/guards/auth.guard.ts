import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants';
import { CurrentUser } from '@/auth/types/current-user';
import { IS_PUBLIC_KEY } from '@/common/guards/public.guard';
import { Reflector } from '@nestjs/core';
import SessionManager from '../utils/session-manager';

// TOOD: add logger to log auth errors
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionManager: SessionManager,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.sessionManager.getSessionCookieFromRequest(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<CurrentUser>(
        token,
        {
          secret: jwtConstants.secret,
        },
      );

      request['user'] = payload;
    } catch (e) {
      // TODO: add logger
      throw new UnauthorizedException();
    }

    return true;
  }
}