import { PrismaClient } from "@prisma/client";
import { post, user } from "./data";
const prisma = new PrismaClient();
async function main() {
  await prisma.users.createMany({ data: user() });
  const result = await prisma.users.findFirst();
  if (result) {
    await prisma.posts.createMany({ data: post(result.id) });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
