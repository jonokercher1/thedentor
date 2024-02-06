import { Prisma, CpdCertificateTemplate, CpdCertificateTemplateFieldType } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { TestCourseService } from './test-course-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestCpdCertificateTemplateService {
  private readonly entity: Prisma.CpdCertificateTemplateDelegate;

  private readonly testCourseService: TestCourseService;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.cpdCertificateTemplate;
    this.testCourseService = new TestCourseService(databaseService);
  }

  public async createTemplate(dataOverrides?: Partial<CpdCertificateTemplate>) {
    let courseId = dataOverrides?.courseId;

    if (!dataOverrides?.courseId) {
      const course = await this.testCourseService.createCourse();
      courseId = course.id;
    } else {
      delete dataOverrides?.courseId;
    }

    const fields = [...Array(3).map(() => {
      const randomIndex = Math.floor(Math.random() * Object.keys(CpdCertificateTemplateFieldType).length);

      return {
        courseId,
        type: CpdCertificateTemplateFieldType[Object.keys(CpdCertificateTemplateFieldType)[randomIndex]],
        positionX: faker.number.int({ min: 0, max: 1000 }),
        positionY: faker.number.int({ min: 0, max: 1000 }),
      };
    })];


    const data: Prisma.CpdCertificateTemplateCreateInput = {
      course: {
        connect: {
          id: courseId,
        },
      },
      fileUrl: `${__dirname}/../data/cpd-certificate-template.pdf`,
      // TODO: Add fields support for overriding this
      fields: {
        createMany: {
          data: fields,
        },
      },
      ...dataOverrides,
    };

    return this.entity.create({ data });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}