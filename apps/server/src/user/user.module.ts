import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { DatabaseModule } from '@/database/database.module';
import { UserRepository } from '@/user/repositories/user.repository';
import { NotificationModule } from '@/notification/notification.module';
import { NotificationService } from '@/notification/notification.service';
import { UserCourseService } from '@/user/services/user-course.service';
import { UserSelfController } from '@/user/controllers/user-self.controller';
import { UserController } from '@/user/controllers/user.controller';
import { AuthModule } from '@/auth/auth.module';
import { UserNotificationPreferenceService } from '@/user/services/user-notification-preference.service';
import { UserNotificationPreferenceRepository } from '@/user/repositories/user-notification-preference.repository';

@Module({
  providers: [
    UserRepository,
    UserService,
    NotificationService,
    UserCourseService,
    UserNotificationPreferenceService,
    UserNotificationPreferenceRepository,
  ],
  controllers: [UserController, UserSelfController],
  exports: [UserService, UserCourseService, UserNotificationPreferenceService],
  imports: [
    DatabaseModule,
    NotificationModule,
    forwardRef(() => AuthModule),
  ],
})
export class UserModule { }
