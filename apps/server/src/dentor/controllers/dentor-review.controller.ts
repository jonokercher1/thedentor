import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { BadRequestException, Controller, Get, Inject, NotFoundException, Param, Query } from '@nestjs/common';
import { DentorReviewService } from '@/dentor/services/dentor-review.service';
import { GetDentorReviewsRequest } from '../requests/get-dentor-reviews.request';
import { DentorService } from '../services/dentor.service';
import EntityNotFound from '@/common/errors/entity-not-found-error';
import { ReviewResponse } from '@/review/responses/review.response';

@Controller('dentor/:id/reviews')
export class DentorReviewController {
  constructor(
    private readonly dentorService: DentorService,
    private readonly dentorReviewService: DentorReviewService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Get('/')
  public async get(@Query() getDentorReviewsInput: GetDentorReviewsRequest, @Param('id') id: string) {
    try {
      // This seems pointless but it is important to check this user is a dentor and exists
      const dentor = await this.dentorService.getById(id);
      const dentorReviews = await this.dentorReviewService.getAllReviewsForDentor(dentor.id, getDentorReviewsInput);
      const dentorReviewsCount = await this.dentorReviewService.countReviewsForDentor(dentor.id);

      return ReviewResponse.paginate(dentorReviews, dentorReviewsCount, getDentorReviewsInput?.page ?? 1);
    } catch (e) {
      this.logger.error('DentorReviewController.get', 'Error getting dentor reviews', {
        error: e.message,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }
}