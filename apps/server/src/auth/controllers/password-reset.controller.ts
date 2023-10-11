import { Public } from '@/common/guards/public.guard';
import { Body, Controller, Get, HttpCode, Param, Put, UnauthorizedException } from '@nestjs/common';
import { RequestPasswordResetRequest } from '../requests/request-password-reset.request';
import { UserPasswordResetService } from '@/user/services/user-password-reset.service';
import { PasswordResetTokenResponse } from '@/auth/responses/password-reset-token.response';

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(
    private readonly userPasswordResetService: UserPasswordResetService,
  ) { }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Get('/:token')
  @HttpCode(200)
  @Public()
  public async getPasswordResetRquestByToken(@Param('token') token: string) {
    console.log('🚀 ~ file: password-reset.controller.ts:18 ~ PasswordResetController ~ getPasswordResetRquestByToken ~ token:', token);
    try {
      const passwordResetRequest = await this.userPasswordResetService.getPasswordResetRequestByToken(token);

      return new PasswordResetTokenResponse(passwordResetRequest);
    } catch (e) {
      console.log('🚀 ~ file: password-reset.controller.ts:24 ~ PasswordResetController ~ getPasswordResetRquestByToken ~ e:', e);
      // TODO: add logger
      throw new UnauthorizedException();
    }
  }

  // TODO: handle any internal errors thrown -> we should have logging from day 0
  @Put('/')
  @HttpCode(204)
  @Public()
  public async requestPasswordReset(@Body() body: RequestPasswordResetRequest) {
    try {
      await this.userPasswordResetService.requestPasswordReset(body.email);
    } catch (e) {
      // TODO: add logger
      // Fail silently
    }
  }
}