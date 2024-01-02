import { Injectable } from '@nestjs/common';
import { PaginationInput } from '@/common/types/pagination';
import { ReviewRepository } from '@/review/repositories/review.repository';
import { ReviewFilters, ReviewSelectFields } from '@/database/types/review';
import { UserRepository } from '@/user/repositories/user.repository';

@Injectable()
export class DentorReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) { }

  public async getAllReviewsForDentor(dentorId: string, paginationInput?: Partial<PaginationInput>) {
    const pagination: PaginationInput = this.getPaginationInputWithDefaults(paginationInput);
    const filters: ReviewFilters = { dentorId };

    return this.reviewRepository.findMany<ReviewFilters, ReviewSelectFields>(
      filters,
      pagination,
      {
        ...ReviewRepository.DEFAULT_FIELDS,
        dentor: {
          select: UserRepository.DEFAULT_FIELDS,
        },
      });
  }

  public async countReviewsForDentor(dentorId: string) {
    return this.reviewRepository.count({
      dentorId,
    });
  }

  private getPaginationInputWithDefaults(paginationInput?: PaginationInput): PaginationInput {
    return {
      page: paginationInput.page ?? 1,
      perPage: paginationInput.perPage ?? 6,
      order: paginationInput?.order ?? 'desc',
      orderBy: paginationInput?.orderBy ?? 'createdAt',
    };
  }
}