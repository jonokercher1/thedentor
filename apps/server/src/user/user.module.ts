import { Module } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { DatabaseModule } from '@/database/database.module';
import { HashingService } from '@/user/hashing.service';
import { UserRepository } from '@/user/repositories/user.repository';
import { NotificationModule } from '@/notification/notification.module';
import { UserPasswordResetService } from '@/user/services/user-password-reset.service';
import { PasswordResetRepository } from '@/user/repositories/password-reset.repository';
import { NotificationService } from '@/notification/notification.service';
import { UserCourseService } from './services/user-course.service';
import { UserSelfController } from './controllers/user-self.controller';

@Module({
  providers: [
    UserRepository,
    UserService,
    HashingService,
    NotificationService,
    UserPasswordResetService,
    PasswordResetRepository,
    UserCourseService,
  ],
  controllers: [UserSelfController],
  exports: [UserService, HashingService, UserPasswordResetService, UserCourseService],
  imports: [DatabaseModule, NotificationModule],
})
export class UserModule { }
