import { Module } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { DatabaseModule } from '@/database/database.module';
import { UserRepository } from '@/user/repositories/user.repository';
import { NotificationModule } from '@/notification/notification.module';
import { NotificationService } from '@/notification/notification.service';
import { UserCourseService } from './services/user-course.service';
import { UserSelfController } from './controllers/user-self.controller';

@Module({
  providers: [
    UserRepository,
    UserService,
    NotificationService,
    UserCourseService,
  ],
  controllers: [UserSelfController],
  exports: [UserService, UserCourseService],
  imports: [DatabaseModule, NotificationModule],
})
export class UserModule { }
