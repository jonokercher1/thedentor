import { Module } from '@nestjs/common';
import { DentorService } from '@/dentor/services/dentor.service';
import { DentorController } from '@/dentor/controllers/dentor.controller';
import { UserRepository } from '@/user/repositories/user.repository';
import { UserModule } from '@/user/user.module';
import { DatabaseModule } from '@/database/database.module';


@Module({
  imports: [DatabaseModule, UserModule],
  providers: [DentorService, UserRepository],
  controllers: [DentorController],
})
export class DentorModule { }
