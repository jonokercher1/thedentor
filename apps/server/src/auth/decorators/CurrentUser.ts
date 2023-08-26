import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser as ICurrentUser } from '../types/CurrentUser';

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): ICurrentUser => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});