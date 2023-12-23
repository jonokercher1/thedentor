import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/repositories/user.repository';
import DuplicateEntityError from '@/common/errors/common/duplicate-entity-error';
import { UserFilters, type CreateUserInput, type UpdateUserInput, type User } from '@/database/types/user';
import { Role } from '@/database/types/role';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async getUserById(id: string): Promise<User> {
    return this.userRepository.findUnique('id', id);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUnique('email', email);
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const existingUser = await this.checkUserExists(input.email, input.gdcNumber);

    if (existingUser) {
      throw new DuplicateEntityError('User');
    }

    return this.userRepository.create({
      email: input.email,
      name: input.name,
      phone: input.phone,
      gdcNumber: input.gdcNumber,
      role: {
        connect: {
          name: Role.Dentist,
        },
      },
    });
  }

  public async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    return this.userRepository.update(id, input);
  }

  public async checkUserExists(email: string, gdcNumber: string): Promise<boolean> {
    return this.userRepository.existsWithAnyUniqueKey(email, gdcNumber);
  }

  public async getOrCreateUserByEmail(email: string, role = Role.Dentist): Promise<User> {
    const userExists = await this.userRepository.exists<UserFilters>({ email });

    if (userExists) {
      return this.getUserByEmail(email);
    }

    return this.createUser({
      email,
      role: {
        connect: {
          name: role,
        },
      },
    });
  }
}
