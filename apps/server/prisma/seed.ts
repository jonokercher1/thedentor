import { PrismaClient, SubscriptionTierName, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.role.createMany({
    data: [
      { name: 'Dentor' },
      { name: 'Dentist' },
    ],
    skipDuplicates: true,
  });

  // Insert subscription tiers
  // await prisma.subscriptionTier.createMany({
  //   data: [
  //     {
  //       name: SubscriptionTierName.DentistPremium,
  //       productId: 'prod_OJFRtdhG1HaenW',
  //       priceId: 'price_1NWcwQFoWbJ9SEsuHrZUxf6i',
  //     },
  //     { name: SubscriptionTierName.DentistFree },
  //   ],
  // });

  // Create a dentist
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'hello@thedentor.com',
      phone: '+4412345678910',
      gdcNumber: '123456',
      password: '$2a$12$cnnR3jI1pM97fBANzjSOH.qDF9UmhX4yiRtCuMTUgz2bTI8CWSRHO', // password
      role: {
        connect: {
          name: RoleName.Dentist,
        },
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database seeded.');
  });