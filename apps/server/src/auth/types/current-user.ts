import { RoleName } from '@prisma/client';

export interface CurrentUser {
  id: string;
  email: string;
  role: RoleName
}