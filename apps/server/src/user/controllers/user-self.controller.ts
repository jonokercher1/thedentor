import { Body, Controller, HttpCode, Inject, Patch, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { UpdateSelfRequest } from '../requests/update-self.request';
import { CurrentUser } from '@/auth/decorators/current-user';
import { CurrentUser as ICurrentUser } from '@/auth/types/current-user';
import { CurrentUserResponse } from '@/user/responses/current-user.response';

@Controller('user/self')
export class UserSelfController {
  constructor(
    private readonly userService: UserService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Patch('/')
  @HttpCode(200)
  public async update(@CurrentUser() currentUser: ICurrentUser, @Body() body: UpdateSelfRequest): Promise<CurrentUserResponse> {
    try {
      const updatedUser = await this.userService.updateUser(currentUser.id, body);

      return new CurrentUserResponse(updatedUser);
    } catch (e) {
      this.logger.error('UserSelfController.update', 'Unable to update self', e?.message, { body });

      throw new UnauthorizedException();
    }
  }
}