import { Body, Controller, UnauthorizedException } from '@nestjs/common';
import { RegisterRequest } from './requests/RegisterRequest';
import { SubscriptionService } from 'src/payment/subscription.service';
import { UserService } from 'src/user/user.service';
import { RoleName } from '@prisma/client';
import CurrentUserResponse from './responses/CurrentUserResponse';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/LoginRequest';
import { HashingService } from 'src/user/hashing.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
    private readonly authService: AuthService,
    private readonly hashingService: HashingService,
  ) { }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  public async login(@Body() body: LoginRequest): Promise<CurrentUserResponse> {
    const user = await this.userService.getUserByEmail(body.email);
    const passwordIsValid = await this.hashingService.verifyHashMatch(body.password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.authService.getAccessToken(user.email);

    return new CurrentUserResponse({ ...user, accessToken });
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  public async register(@Body() body: RegisterRequest): Promise<CurrentUserResponse> {
    const role = RoleName.Dentist;
    const user = await this.userService.createUser({ ...body, role: { connect: { name: role } } });

    await this.subscriptionService.createCustomerWithPremiumSubscription(user);

    const accessToken = await this.authService.getAccessToken(body.email);

    return new CurrentUserResponse({ ...user, accessToken });
  }
}
