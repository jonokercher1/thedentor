import { RoleName } from '@prisma/client';

export const Role = RoleName;
export type Role = (typeof Role)[keyof typeof Role]