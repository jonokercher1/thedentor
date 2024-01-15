import { BadRequestException, Body, Controller, HttpCode, Inject, Put } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { CreateUserRequest } from '../requests/create-user.request';
import { Role } from '@/database/types/role';
import { PublicUserResponse } from '../responses/user.response';
// import { CurrentUser } from '@/common/decorators/current-user';
// import { CurrentUser as ICurrentUser } from '@/auth/types/current-user';
import { RequiresApiKey } from '@/auth/guards/api-key.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @RequiresApiKey()
  @HttpCode(200)
  @Put('/')
  public async createUser(@Body() body: CreateUserRequest): Promise<any> {
    try {
      const { email, ...userData } = body;
      const user = await this.userService.getOrCreateUserByEmail(email, { ...userData, roleName: Role.Dentist });

      return new PublicUserResponse(user);
    } catch (e) {
      this.logger.error('UserController.createUser', 'Failed to create user', e.message);

      throw new BadRequestException();
    }
  }
}