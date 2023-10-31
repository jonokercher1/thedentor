import { CourseType, PrismaClient, RoleName } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';
import * as dayjs from 'dayjs';

export default class CourseSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running course seeder');
    await this.createInPersonCourses(10);
  }

  private async createInPersonCourses(count = 10) {
    return Promise.allSettled([...Array(count)].map(i => {
      const startDate = faker.date.between({ from: dayjs().subtract(5, 'weeks').toDate(), to: dayjs().add(5, 'weeks').toDate() });

      return this.database.course.create({
        data: {
          type: CourseType.InPerson,
          price: faker.number.int({ min: 10000, max: 350000 }),
          cpdValue: faker.number.int({ min: 1, max: 25 }),
          name: faker.company.name(),
          description: faker.lorem.sentences({ min: 1, max: 4 }),
          startDate,
          endDate: faker.date.between({ from: startDate, to: dayjs().add(6, 'weeks').toDate() }),
          featuredUntil: i % 3 === 0 ? faker.date.between({ from: dayjs().subtract(1, 'day').toDate(), to: dayjs().add(3, 'weeks').toDate() }) : undefined,
          category: {
            create: {
              slug: faker.word.sample(),
              label: faker.word.sample(),
            },
          },
          dentor: {
            create: {
              name: faker.person.fullName(),
              email: faker.internet.email(),
              phone: faker.phone.number('+44##########'),
              gdcNumber: faker.number.int({ min: 100000, max: 999999 }).toString(),
              role: {
                connect: {
                  name: RoleName.Dentor,
                },
              },
            },
          },
        },
      });
    }));
  }
}