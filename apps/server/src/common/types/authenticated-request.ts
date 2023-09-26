import { CurrentUser } from '@/auth/types/current-user';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: CurrentUser
}

export default AuthenticatedRequest;
