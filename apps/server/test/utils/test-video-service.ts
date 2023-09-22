import { Prisma, Video } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestUserService } from './test-user-service';
import { TestImageService } from './test-image-service';

export class TestVideoService {
  private readonly entity: Prisma.VideoDelegate;

  constructor(
    databaseService: TestDatabaseService,
    private readonly userSerivce: TestUserService,
    private readonly imageService: TestImageService,
  ) {
    this.entity = databaseService.database.video;
  }

  public async createVideo(dataOverrides?: Partial<Video>): Promise<Video> {
    const userId = dataOverrides?.userId ?? (await this.userSerivce.createDentor()).id;
    const thumbnailId = dataOverrides?.thumbnailId ?? (await this.imageService.createImage({ userId })).id;

    return this.entity.create({
      data: {
        url: dataOverrides.url ?? faker.internet.url(),
        title: dataOverrides.title ?? faker.string.sample(),
        description: dataOverrides.description ?? faker.string.sample(),
        userId,
        thumbnailId,
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}