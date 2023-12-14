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
import { PasswordResetController } from '@/auth/controllers/password-reset.controller';
import { LoggingModule } from '@/logging/logging.module';

@Module({
  providers: [AuthService, SessionManager],
  controllers: [AuthController, PasswordResetController],
  exports: [SessionManager],
  imports: [
    DatabaseModule,
    UserModule,
    CommonModule,
    PaymentModule,
    LoggingModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
})
export class AuthModule { }
