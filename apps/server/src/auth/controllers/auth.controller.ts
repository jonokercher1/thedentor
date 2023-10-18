import { BadRequestException, Body, Controller, Get, HttpCode, Inject, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from '@/auth/requests/register.request';
import { SubscriptionService } from '@/payment/subscription.service';
import { UserService } from '@/user/services/user.service';
import { CurrentUserResponse } from '@/auth/responses/current-user.response';
import { AuthService } from '@/auth/auth.service';
import { LoginRequest } from '@/auth/requests/login.request';
import { HashingService } from '@/user/hashing.service';
import { Public } from '@/common/guards/public.guard';
import { Response } from 'express';
import SessionManager from '@/auth/utils/session-manager';
import AuthenticatedRequest from '@/common/types/authenticated-request';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import DuplicateEntityError from '@/common/errors/common/duplicate-entity-error';
import { Role } from '@/database/types/role';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
    private readonly authService: AuthService,
    private readonly hashingService: HashingService,
    private readonly sessionManager: SessionManager,
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
  ) { }

  @Post('login')
  @HttpCode(200)
  @Public()
  public async login(@Body() body: LoginRequest, @Res({ passthrough: true }) response: Response): Promise<CurrentUserResponse> {
    try {
      const user = await this.userService.getUserByEmail(body.email);
      await this.hashingService.verifyHashMatch(body.password, user.password);

      const accessToken = await this.authService.getAccessToken(user.email);
      this.sessionManager.setSessionCookieInResponse(response, accessToken);

      return new CurrentUserResponse(user);
    } catch (e) {
      this.logger.error('login', 'Unable to login', e?.message, { body });

      throw new UnauthorizedException();
    }
  }

  @Post('register')
  @HttpCode(200)
  @Public()
  public async register(@Body() body: RegisterRequest, @Res({ passthrough: true }) response: Response): Promise<CurrentUserResponse> {
    try {
      const role = Role.Dentist;
      const user = await this.userService.createUser({ ...body, role: { connect: { name: role } } });

      await this.subscriptionService.createCustomerWithPremiumSubscription(user);

      const accessToken = await this.authService.getAccessToken(body.email);
      this.sessionManager.setSessionCookieInResponse(response, accessToken);

      return new CurrentUserResponse(user);
    } catch (e) {
      this.logger.error('register', 'Unable to register', e?.message, { body });

      if (e instanceof DuplicateEntityError) {
        throw new BadRequestException(e.message);
      }

      throw new BadRequestException('Unable to register');
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
      this.logger.error('getSelf', 'Unable to get current user', e?.message, { user: request.user });

      throw new UnauthorizedException();
    }
  }
}
