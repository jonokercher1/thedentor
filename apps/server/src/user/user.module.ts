import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { HashingService } from './hashing.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [UserRepository, UserService, HashingService],
  exports: [UserService, HashingService],
  imports: [DatabaseModule],
})
export class UserModule { }
