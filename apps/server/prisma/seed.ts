import { PrismaClient, SubscriptionTierName } from '@prisma/client';

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
  await prisma.subscriptionTier.createMany({
    data: [
      {
        name: SubscriptionTierName.DentistPremium,
        productId: 'prod_OJFRtdhG1HaenW',
        priceId: 'price_1NWcwQFoWbJ9SEsuHrZUxf6i',
      },
      { name: SubscriptionTierName.DentistFree },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database seeded.');
  });