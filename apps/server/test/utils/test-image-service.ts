import { FileSize, Image, Prisma, File } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestUserService } from './test-user-service';

export class TestImageService {
  private readonly imageEntity: Prisma.ImageDelegate;

  private readonly fileEntity: Prisma.FileDelegate;

  constructor(
    databaseService: TestDatabaseService,
    private readonly userSerivce: TestUserService,
  ) {
    this.imageEntity = databaseService.database.image;
    this.fileEntity = databaseService.database.file;
  }

  public async createImage(dataOverrides?: Partial<Image>): Promise<Image> {
    const userId = dataOverrides.userId ?? (await this.userSerivce.createDentor()).id;

    return this.imageEntity.create({
      data: {
        userId,
      },
    });
  }

  public async createImageFile(dataOverrides?: Partial<File>): Promise<File> {
    const imageId = dataOverrides?.imageId ?? (await this.createImage()).id;

    return this.fileEntity.create({
      data: {
        size: FileSize.Original,
        name: faker.string.sample(),
        mime: faker.system.mimeType(),
        imageId,
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.fileEntity.deleteMany();
    await this.imageEntity.deleteMany();
  }
}