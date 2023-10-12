import { Public } from '@/common/guards/public.guard';
import { Body, Controller, Get, HttpCode, Param, Patch, Put, UnauthorizedException } from '@nestjs/common';
import { RequestPasswordResetRequest } from '@/auth/requests/request-password-reset.request';
import { UserPasswordResetService } from '@/user/services/user-password-reset.service';
import { PasswordResetTokenResponse } from '@/auth/responses/password-reset-token.response';
import HttpSuccessResponse from '@/common/responses/http-success.response';
import { ResetPasswordRequest } from '@/auth/requests/reset-password.request';
import { UserService } from '@/user/services/user.service';

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(
    private readonly userPasswordResetService: UserPasswordResetService,
    private readonly userSerivce: UserService,
  ) { }

  @Patch()
  @HttpCode(200)
  @Public()
  public async resetPassword(@Body() body: ResetPasswordRequest) {
    try {
      // TODO: this could be a good candidate for a db txn
      const passwordResetRequest = await this.userPasswordResetService.getPasswordResetRequestByToken(body.token);
      await this.userSerivce.updateUser(passwordResetRequest.userId, { password: body.password });
      await this.userPasswordResetService.deleteResetToken(passwordResetRequest.id);

      return new HttpSuccessResponse();
    } catch (e) {
      // TODO: add logger
      throw new UnauthorizedException();
    }
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Get('/:token')
  @HttpCode(200)
  @Public()
  public async getPasswordResetRquestByToken(@Param('token') token: string) {
    try {
      const passwordResetRequest = await this.userPasswordResetService.getPasswordResetRequestByToken(token);

      return new PasswordResetTokenResponse(passwordResetRequest);
    } catch (e) {
      // TODO: add logger
      throw new UnauthorizedException();
    }
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Put('/token')
  @HttpCode(200)
  @Public()
  public async requestPasswordReset(@Body() body: RequestPasswordResetRequest) {
    try {
      await this.userPasswordResetService.requestPasswordReset(body.email);
    } catch (e) {
      // TODO: add logger
      // Fail silently
    }

    return new HttpSuccessResponse();
  }
} 