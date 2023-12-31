import { Module } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { DatabaseModule } from '@/database/database.module';
import { HashingService } from '@/user/hashing.service';
import { UserRepository } from '@/user/repositories/user.repository';
import { NotificationModule } from '@/notification/notification.module';
import { UserPasswordResetService } from '@/user/services/user-password-reset.service';
import { PasswordResetRepository } from '@/user/repositories/password-reset.repository';
import { NotificationService } from '@/notification/notification.service';

@Module({
  providers: [UserRepository, UserService, HashingService, NotificationService, UserPasswordResetService, PasswordResetRepository],
  exports: [UserService, HashingService, UserPasswordResetService],
  imports: [DatabaseModule, NotificationModule],
})
export class UserModule { }
