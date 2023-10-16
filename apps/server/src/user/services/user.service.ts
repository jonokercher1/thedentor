import { Injectable } from '@nestjs/common';
import { RoleName, User, Prisma } from '@prisma/client';
import { HashingService } from '@/user/hashing.service';
import { UserRepository } from '@/user/repositories/user.repository';
import DuplicateEntityError from '@/common/errors/common/duplicate-entity-error';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
  ) { }

  public async getUserById(id: string): Promise<User> {
    return this.userRepository.findUnique('id', id);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUnique('email', email);
  }

  public async createUser(input: Prisma.UserCreateInput): Promise<User> {
    const password = input?.password ? await this.hashingService.hashString(input.password) : null;
    const existingUser = await this.checkUserExists(input.email, input.gdcNumber);

    if (existingUser) {
      throw new DuplicateEntityError('User');
    }

    return this.userRepository.create({
      email: input.email,
      name: input.name,
      phone: input.phone,
      gdcNumber: input.gdcNumber,
      password,
      role: {
        connect: {
          name: RoleName.Dentist,
        },
      },
    });
  }

  public async updateUser(id: string, input: Prisma.UserUpdateInput): Promise<User> {
    const data = { ...input };

    // TODO: handle the Prisma.NullableStringFieldUpdateOperationsInput
    if (input.password) {
      data.password = await this.hashingService.hashString(input.password as string);
    }

    return this.userRepository.update(id, data);
  }

  public async checkUserExists(email: string, gdcNumber: string): Promise<boolean> {
    return this.userRepository.existsWithAnyUniqueKey(email, gdcNumber);
  }
}
