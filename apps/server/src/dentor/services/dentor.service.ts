import { Injectable } from '@nestjs/common';
import { PaginationInput } from '@/common/types/pagination';
import { UserRepository } from '@/user/repositories/user.repository';
import { User, UserFilters, UserSelectFields } from '@/database/types/user';
import { Role } from '@/database/types/role';

@Injectable()
export class DentorService {
  constructor(private readonly userRepository: UserRepository) { }

  public async getById(id: string): Promise<User> {
    return this.userRepository.findFirst({
      id,
      roleName: Role.Dentor,
    });
  }

  public async getFeaturedDentors(paginationInput?: Partial<PaginationInput>) {
    const pagination: PaginationInput = {
      page: paginationInput.page ?? 1,
      perPage: paginationInput.perPage ?? 6,
      order: paginationInput?.order ?? 'desc',
      orderBy: paginationInput?.orderBy ?? 'rating',
    };

    const filters = this.getFeaturedFilters();
    const select = { ...UserRepository.DEFAULT_FIELDS, rating: true };

    return this.userRepository.findMany<UserFilters, UserSelectFields>(filters, pagination, select);
  }

  public async countFeatured() {
    return this.count(this.getFeaturedFilters());
  }

  public async count(filters?: UserFilters) {
    return this.userRepository.count(filters);
  }

  private getDefaultFilters(): UserFilters {
    return {
      roleName: Role.Dentor,
    };
  }

  private getFeaturedFilters(): UserFilters {
    return {
      ...this.getDefaultFilters(),
      rating: {
        gte: 4.5,
      },
    };
  }
}
