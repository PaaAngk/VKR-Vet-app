import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      login: 'manager',
      password: '$2b$10$LEcbl6NJTbQviHhCDjIYiOWmOFIvcri1LQoFLidKvw/wPbPhJezyu', // nFO0uUVL
      role: 'MANAGER',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      login: 'doctor',
      role: 'DOCTOR',
      password: '$2b$10$V8lBLpc3c7KC2kFebMM8J.bSxyL7RQ2s5hCflUOfSfDKGTpxXYs1G', // sDvLp37v
    },
  });
  const user3 = await prisma.user.create({
    data: {
      login: 'admin',
      role: 'ADMIN',
      password: '$2b$10$6T2UhDzVlBv9D8Mmom6yAuGBvg6uck66ry.sqTvZyN7ExA3e3OFhO', // Ir3i4Tjn
    },
  });

  console.log({ user1, user2, user3 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
