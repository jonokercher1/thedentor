import { Role } from '@/database/types/role';
export interface ICurrentUser {
  id: string;
  email: string;
  role: Role
}