import { BadRequestException, Controller, Get, Inject, NotFoundException, Param, Query } from '@nestjs/common';
import { DentorService } from '@/dentor/services/dentor.service';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { DentorResponse } from '../responses/dentor.response';
import { GetFeaturedDentorsRequest } from '../requests/get-featured-dentors.request';
import EntityNotFound from '@/common/errors/common/entity-not-found-error';

@Controller('dentor')
export class DentorController {
  constructor(
    private readonly dentorService: DentorService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Get('/featured')
  public async getFeatured(@Query() getFeaturedDentorsInput: Partial<GetFeaturedDentorsRequest>) {
    try {
      const page = getFeaturedDentorsInput?.page ? Number(getFeaturedDentorsInput.page) : 1;
      const featuredDentors = await this.dentorService.getFeaturedDentors(getFeaturedDentorsInput);
      const featuredDentorsCount = await this.dentorService.countFeatured();

      return DentorResponse.paginate(featuredDentors, featuredDentorsCount, page);
    } catch (e) {
      this.logger.error('DentorController.getFeatured', 'Error getting featured dentors', {
        error: e.message,
      });

      throw new BadRequestException();
    }
  }

  @Get('/:id')
  public async get(@Param('id') id: string) {
    try {
      const dentor = await this.dentorService.getById(id);

      return new DentorResponse(dentor);
    } catch (e) {
      this.logger.error('DentorController.get', 'Error getting dentor', {
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
