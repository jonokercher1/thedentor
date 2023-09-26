import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants';
import { DatabaseModule } from '@/database/database.module';
import { CommonModule } from '@/common/common.module';
import { UserModule } from '@/user/user.module';
import { PaymentModule } from '@/payment/payment.module';
import SessionManager from '@/auth/utils/session-manager';

@Module({
  providers: [AuthService, SessionManager],
  controllers: [AuthController],
  exports: [SessionManager],
  imports: [
    DatabaseModule,
    UserModule,
    CommonModule,
    PaymentModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
})
export class AuthModule { }
