import { SetMetadata } from '@nestjs/common';

export const REQUIRES_API_KEY_KEY = 'usesApiKeyAuth';
export const RequiresApiKey = () => SetMetadata(REQUIRES_API_KEY_KEY, true);