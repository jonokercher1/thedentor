import { Body, Controller, Get, HttpCode, Inject, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { CurrentUserResponse } from '@/user/responses/current-user.response';
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/auth/guards/public.guard';
import { Response } from 'express';
import SessionManager from '@/auth/utils/session-manager';
import AuthenticatedRequest from '@/common/types/authenticated-request';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { GetOneTimePasswordRequest } from '@/auth/requests/one-time-password.request';
import { OneTimePasswordService } from '@/auth/services/one-time-password.service';
import AlreadyHasOneTimePasswordError from '@/auth/errors/already-has-one-time-password-error';
import OneTimePasswordResponse from '@/auth/responses/one-time-password.response';
import InvalidEmailAndOneTimePasswordCombinationError from '@/auth/errors/invalid-email-and-one-time-password-combination.error';
import { OneTimePasswordLoginRequest } from '@/auth/requests/one-time-password-login.request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly sessionManager: SessionManager,
    private readonly oneTimePasswordService: OneTimePasswordService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Post('one-time-password')
  @HttpCode(200)
  @Public()
  public async generateOneTimePassword(@Body() body: GetOneTimePasswordRequest) {
    try {
      const user = await this.userService.getOrCreateUserByEmail(body.email);
      const canRequestOneTimePassword = await this.oneTimePasswordService.canUserRequestOneTimePassword(user);

      if (!canRequestOneTimePassword) throw new AlreadyHasOneTimePasswordError();

      const oneTimePassword = await this.oneTimePasswordService.requestNewOneTimePasswordForUser(user);

      return new OneTimePasswordResponse({
        createdAt: oneTimePassword.createdAt.toISOString(),
      });
    } catch (e) {
      this.logger.error('AuthController.generateOneTimePassword', 'Unable to generate one time password', e?.message, { body });

      throw new UnauthorizedException();
    }
  }

  @Post('one-time-password/login')
  @HttpCode(200)
  @Public()
  public async validateOneTimePassword(@Body() body: OneTimePasswordLoginRequest, @Res({ passthrough: true }) response: Response) {
    try {
      const oneTimePassword = await this.oneTimePasswordService.verifyEmailAndOneTimePasswordCombination(body.email, body.oneTimePassword);

      if (!oneTimePassword) throw new InvalidEmailAndOneTimePasswordCombinationError();

      const user = await this.userService.getUserByEmail(body.email);
      const accessToken = await this.authService.getAccessToken(user.email);
      this.sessionManager.setSessionCookieInResponse(response, accessToken);

      await this.oneTimePasswordService.expireAllUsersOneTimePasswords(user);

      return new CurrentUserResponse(user);
    } catch (e) {
      this.logger.error('AuthController.validateOneTimePassword', 'Invalid one time password login attempt', e?.message, { body });

      throw new UnauthorizedException();
    }
  }

  @Get('me')
  @HttpCode(200)
  public async getSelf(@Req() request: AuthenticatedRequest, @Res({ passthrough: true }) response: Response): Promise<CurrentUserResponse> {
    try {
      const user = await this.userService.getUserById(request.user.id);

      // Renew their session because we're nice
      const accessToken = await this.authService.getAccessToken(request.user.email);
      this.sessionManager.setSessionCookieInResponse(response, accessToken);

      return new CurrentUserResponse(user);
    } catch (e) {
      this.logger.error('AuthController.getSelf', 'Unable to get current user', e?.message, { user: request.user });

      throw new UnauthorizedException();
    }
  }
}
