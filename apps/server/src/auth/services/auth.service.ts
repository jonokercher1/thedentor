import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/services/user.service';
import { CurrentUser } from '@/auth/types/current-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  public async getAccessToken(email: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    const payload: CurrentUser = {
      id: user.id,
      email: user.email,
      role: user.roleName,
    };

    return this.jwtService.signAsync(payload);
  }

  public async decryptAccessToken(accessToken: string): Promise<CurrentUser> {
    const payload = this.jwtService.decode(accessToken);

    return payload as CurrentUser;
  }
}
