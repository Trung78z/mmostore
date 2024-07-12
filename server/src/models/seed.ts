import { PrismaClient } from "@prisma/client";
import {
  post,
  postCategory,
  content,
  user,
  service,
  // profile,
  serviceSell,
  serviceCategories,
} from "./data";
const prisma = new PrismaClient();
async function main() {
  // await prisma.users.createMany({ data: user() });
  await createUser();
  const result = await prisma.users.findFirst();

  await prisma.homepages.create({ data: { content } });
  await prisma.postCategory.createMany({ data: postCategory() });

  await createServiceCategories();

  // await createServiceCategories2();

  if (result) {
    // await prisma.profiles.create({ data: profile(result.id) });
    await prisma.posts.createMany({ data: post(result.id) });
    await prisma.services.createMany({ data: service(result.id) });
    await prisma.serviceSales.createMany({ data: serviceSell });
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

async function createServiceCategories() {
  const categories = serviceCategories();

  for (const item of categories) {
    // Create service category
    const createdCategory = await prisma.serviceCategory.create({
      data: { category: item.category },
    });

    // If category was created successfully
    if (createdCategory) {
      // Create service subcategories
      for (const child of item.data) {
        const createdSubCategory = await prisma.serviceSubCategory.create({
          data: {
            subCategory: child.subCategory,
            subCategoryCover: child.subCategoryCover,
            serviceCategoryId: createdCategory.id,
          },
        });

        // If subcategory was created successfully
        if (createdSubCategory) {
          // Create children categories
          const childrenData = child.childrenCategory.map((child) => ({
            ...child,
            serviceSubCategoryId: createdSubCategory.id,
          }));

          await prisma.serviceChildrenCategory.createMany({
            data: childrenData,
          });
        }
      }
    }
  }
}
async function createUser() {
  for (const item of user()) {
    await prisma.users.create({
      data: {
        email: item.email,
        username: item.username,
        password: item.password,
        profiles: {
          create: {
            lastName: item.profiles.lastName,
            firstName: item.profiles.firstName,
            accountBalance: item.profiles.accountBalance,
          },
        },
      },
    });
  }
}
