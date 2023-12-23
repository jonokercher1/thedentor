import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { AuthController } from '@/auth/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants';
import { DatabaseModule } from '@/database/database.module';
import { CommonModule } from '@/common/common.module';
import { UserModule } from '@/user/user.module';
import { PaymentModule } from '@/payment/payment.module';
import SessionManager from '@/auth/utils/session-manager';
import { LoggingModule } from '@/logging/logging.module';
import { OneTimePasswordService } from '@/auth/services/one-time-password.service';
import { OneTimePasswordRepository } from '@/auth/repositories/one-time-password.repository';
import { NotificationModule } from '@/notification/notification.module';
import { NotificationService } from '@/notification/notification.service';

@Module({
  providers: [
    AuthService,
    SessionManager,
    OneTimePasswordService,
    OneTimePasswordRepository,
    NotificationService,
  ],
  controllers: [AuthController],
  exports: [SessionManager],
  imports: [
    DatabaseModule,
    UserModule,
    CommonModule,
    PaymentModule,
    LoggingModule,
    NotificationModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
})
export class AuthModule { }
