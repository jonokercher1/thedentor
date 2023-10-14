import { Controller, Get } from '@nestjs/common';
import { TestRepository } from '@/search/repositories/test.repository';
import { Public } from '@/common/guards/public.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly testRepository: TestRepository) { }

  @Public()
  @Get('/')
  public async test() {
    await this.testRepository.test();

    return {
      name: 'test',
    };
  }
}
