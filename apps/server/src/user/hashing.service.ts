import InvalidHashError from '@/common/errors/auth/invalid-hash-error';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  public async hashString(input: string): Promise<string> {
    return bcrypt.hash(input, this.saltRounds);
  }

  public async verifyHashMatch(unhashed: string, hashed: string): Promise<boolean> {
    const matches = await bcrypt.compare(unhashed, hashed);

    if (!matches) {
      throw new InvalidHashError();
    }

    return true;
  }
}