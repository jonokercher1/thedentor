import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from '@/auth/requests/register.request';
import { SubscriptionService } from '@/payment/subscription.service';
import { UserService } from '@/user/services/user.service';
import { RoleName } from '@prisma/client';
import { CurrentUserResponse } from '@/auth/responses/current-user.response';
import { AuthService } from '@/auth/auth.service';
import { LoginRequest } from '@/auth/requests/login.request';
import { HashingService } from '@/user/hashing.service';
import { Public } from '@/common/guards/public.guard';
import { Response } from 'express';
import SessionManager from '@/auth/utils/session-manager';
import AuthenticatedRequest from '@/common/types/authenticated-request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
    private readonly authService: AuthService,
    private readonly hashingService: HashingService,
    private readonly sessionManager: SessionManager,
  ) { }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
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
      // TOOD: add logger
      throw new UnauthorizedException();
    }
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Post('register')
  @HttpCode(200)
  @Public()
  public async register(@Body() body: RegisterRequest, @Res({ passthrough: true }) response: Response): Promise<CurrentUserResponse> {
    try {
      const role = RoleName.Dentist;
      const user = await this.userService.createUser({ ...body, role: { connect: { name: role } } });

      await this.subscriptionService.createCustomerWithPremiumSubscription(user);

      const accessToken = await this.authService.getAccessToken(body.email);
      this.sessionManager.setSessionCookieInResponse(response, accessToken);

      return new CurrentUserResponse(user);
    } catch (e) {
      // TOOD: add logger
      if (e.message === 'User already exists') {
        throw new BadRequestException(e.message);
      }

      throw new BadRequestException('Unable to register');
    }
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
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
      // TODO: add logger
      throw new UnauthorizedException();
    }
  }
}
