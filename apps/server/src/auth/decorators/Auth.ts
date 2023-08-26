import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { AuthGuard } from '../guards/Auth';
import { RolesGuard } from '../guards/Roles';

export function Auth(...roles: RoleName[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}