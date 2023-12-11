import { CourseType, PrismaClient, RoleName } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';
import * as dayjs from 'dayjs';
import algoliasearch, { SearchIndex } from 'algoliasearch';

export default class CourseSeeder {
  private readonly algolia: SearchIndex;

  constructor(
    private readonly database: PrismaClient,
  ) {
    const algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
    this.algolia = algolia.initIndex('course');
    this.algolia.setSettings({
      attributesForFaceting: [
        'startDate',
        'endDate',
      ],
    });
  }

  public async run() {
    console.log('Running course seeder');
    await this.clearExistingCourseData();
    await this.createInPersonCourses(10);
  }

  // This is so we dont end up with stupid amounts of data in algolia
  private async clearExistingCourseData() {
    try {
      await this.algolia.clearObjects();
      await this.database.course.deleteMany();
    } catch (e) {
      console.error(`Error deleting course index: ${e.message}`);
    }
  }

  private async createInPersonCourses(count = 10) {
    return Promise.allSettled([...Array(count)].map(async i => {
      const startDate = faker.date.between({ from: dayjs().subtract(5, 'weeks').toDate(), to: dayjs().add(5, 'weeks').toDate() });
      const endDate = faker.date.between({ from: startDate, to: dayjs().add(6, 'weeks').toDate() });
      const dentorData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+44##########'),
        gdcNumber: faker.number.int({ min: 100000, max: 999999 }).toString(),
        role: {
          connect: {
            name: RoleName.Dentor,
          },
        },
      };

      const course = await this.database.course.create({
        data: {
          type: CourseType.InPerson,
          price: faker.number.int({ min: 10000, max: 350000 }),
          cpdValue: faker.number.int({ min: 1, max: 25 }),
          name: faker.company.name(),
          description: faker.lorem.sentences({ min: 1, max: 4 }),
          availablePlaces: faker.number.int({ max: 100 }),
          startDate,
          endDate,
          featuredUntil: i % 3 === 0 ? faker.date.between({ from: dayjs().subtract(1, 'day').toDate(), to: dayjs().add(3, 'weeks').toDate() }) : undefined,
          category: {
            create: {
              slug: faker.word.sample(),
              label: faker.word.sample(),
            },
          },
          dentor: {
            create: dentorData,
          },
        },
      });

      // Init an index for this object in algolia
      await this.algolia.saveObject({
        objectID: course.id,
        name: course.name,
        description: course.description,
        dentorName: dentorData.name,
        startDate: dayjs(startDate).unix(),
        endDate: dayjs(endDate).unix(),
      }).catch((e) => {
        console.error(`Error creating course index: ${e.message}`);
      });
    }));
  }
}