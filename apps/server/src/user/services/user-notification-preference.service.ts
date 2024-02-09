import { Injectable } from '@nestjs/common';
import { UserNotificationPreferenceRepository } from '@/user/repositories/user-notification-preference.repository';

@Injectable()
export class UserNotificationPreferenceService {
  constructor(
    private readonly userNotificationPreferenceRepository: UserNotificationPreferenceRepository,
  ) { }

  public async getUserNotificationPreferences(userId: string) {
    return this.userNotificationPreferenceRepository.getUserNotificationPreferences(userId);
  }
}