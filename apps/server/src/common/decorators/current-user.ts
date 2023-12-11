import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import AuthenticatedRequest from '../types/authenticated-request';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();
    return request.user;
  },
);