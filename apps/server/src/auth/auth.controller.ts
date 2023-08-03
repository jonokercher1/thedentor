import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from './requests/RegisterRequest';
import { SubscriptionService } from '../payment/subscription.service';
import { UserService } from '../user/user.service';
import { RoleName } from '@prisma/client';
import { CurrentUserResponse } from './responses/CurrentUserResponse';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/LoginRequest';
import { HashingService } from '../user/hashing.service';
import { Public } from '../common/guards/public';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
    private readonly authService: AuthService,
    private readonly hashingService: HashingService,
  ) { }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Post('login')
  @HttpCode(200)
  @Public()
  public async login(@Body() body: LoginRequest): Promise<CurrentUserResponse> {
    try {
      const user = await this.userService.getUserByEmail(body.email);
      await this.hashingService.verifyHashMatch(body.password, user.password);

      const accessToken = await this.authService.getAccessToken(user.email);

      return new CurrentUserResponse({ ...user, accessToken });
    } catch (e) {
      // TOOD: add logger
      throw new UnauthorizedException();
    }
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Post('register')
  @HttpCode(200)
  @Public()
  public async register(@Body() body: RegisterRequest): Promise<CurrentUserResponse> {
    try {
      const role = RoleName.Dentist;
      const user = await this.userService.createUser({ ...body, role: { connect: { name: role } } });

      await this.subscriptionService.createCustomerWithPremiumSubscription(user);

      const accessToken = await this.authService.getAccessToken(body.email);

      return new CurrentUserResponse({ ...user, accessToken });
    } catch (e) {
      // TOOD: add logger
      if (e.message === 'User already exists') {
        throw new BadRequestException(e.message);
      }

      throw new BadRequestException('Unable to register');
    }
  }
}
