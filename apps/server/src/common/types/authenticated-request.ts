import { ICurrentUser } from '@/auth/types/current-user';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: ICurrentUser
}

export default AuthenticatedRequest;
