import { Module } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { DatabaseModule } from '@/database/database.module';
import { HashingService } from '@/user/hashing.service';
import { UserRepository } from '@/user/repositories/user.repository';

@Module({
  providers: [UserRepository, UserService, HashingService],
  exports: [UserService, HashingService],
  imports: [DatabaseModule],
})
export class UserModule { }
