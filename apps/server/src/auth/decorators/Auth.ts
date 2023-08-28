import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';

export function Auth(...roles: RoleName[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}