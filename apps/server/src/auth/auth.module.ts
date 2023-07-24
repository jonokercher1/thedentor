import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/Auth';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
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
