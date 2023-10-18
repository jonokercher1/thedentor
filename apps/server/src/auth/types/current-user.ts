import { Role } from '@/database/types/role';
export interface CurrentUser {
  id: string;
  email: string;
  role: Role
}