import { CourseVideo, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';
import { TestVideoService } from './test-video-service';
import { TestCourseService } from './test-course-service';

export class TestCourseVideoService {
  private readonly entity: Prisma.CourseVideoDelegate;

  constructor(
    databaseService: TestDatabaseService,
    private readonly videoService: TestVideoService,
    private readonly courseService: TestCourseService,
  ) {
    this.entity = databaseService.database.courseVideo;
  }

  public async createCourseVideo(dataOverrides?: Partial<CourseVideo>): Promise<CourseVideo> {
    const [video, course] = await Promise.all([this.videoService.createVideo(), this.courseService.createCourse()]);

    return this.entity.create({
      data: {
        moduleName: dataOverrides?.moduleName ?? faker.string.sample(),
        videoId: video.id,
        courseId: course.id,
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}