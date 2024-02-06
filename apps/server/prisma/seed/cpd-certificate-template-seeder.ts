import { CpdCertificateTemplateFieldType, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';

export default class CpdCertificateTemplateSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running cpd certificate template seeder');

    const courses = await this.database.course.findMany({});

    const templatesPromises = courses.map((course) => {
      console.log(`Seeding template for course ${course.id}...`);
      return this.database.cpdCertificateTemplate.create({
        data: {
          courseId: course.id,
          fileUrl: '/cpd-certificate-template.pdf',
          fields: {
            createMany: {
              data: [
                {
                  type: CpdCertificateTemplateFieldType.CourseName,
                  positionX: faker.number.int({ min: 0, max: 1000 }),
                  positionY: faker.number.int({ min: 0, max: 1000 }),
                },
                {
                  type: CpdCertificateTemplateFieldType.CourseObjectives,
                  positionX: faker.number.int({ min: 0, max: 1000 }),
                  positionY: faker.number.int({ min: 0, max: 1000 }),
                },
                {
                  type: CpdCertificateTemplateFieldType.DentorGdcNumber,
                  positionX: faker.number.int({ min: 0, max: 1000 }),
                  positionY: faker.number.int({ min: 0, max: 1000 }),
                },
                {
                  type: CpdCertificateTemplateFieldType.DentorName,
                  positionX: faker.number.int({ min: 0, max: 1000 }),
                  positionY: faker.number.int({ min: 0, max: 1000 }),
                },
              ],
            },
          },
        },
      });
    });

    await Promise.all(templatesPromises);
  }
}