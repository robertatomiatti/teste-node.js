import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.account.upsert({
    where: { conta: 54321 },
    update: { saldo: 160 },
    create: { conta: 54321, saldo: 160 }
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
