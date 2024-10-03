import { PrismaClient } from "@prisma/client";
import {
  post,
  postCategory,
  serviceCategories,
  productCategories,
} from "./data/data";
import { user } from "./data/user";
import { products } from "./data/product";
import { services } from "./data/service";
const prisma = new PrismaClient();
async function main() {
  await createUser();
  const result = await prisma.users.findFirst({ where: { role: "ADMIN" } });
  await createCategory();
  await productCategory();
  await prisma.postCategory.createMany({ data: postCategory() });
  if (result) {
    await prisma.posts.createMany({ data: post(result.id) });
    await createService();
    await productService();
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
async function createCategory() {
  try {
    const categories = serviceCategories();
    for (let item of categories) {
      await prisma.serviceCategory.create({
        data: {
          category: item.Category,
          categoryCover: item.CategoryCover,
          subCategory: {
            createMany: { data: item.subCategories },
          },
        },
      });
    }
  } catch (error) {
    console.error("Error in createCategory:", error);
  }
}
async function productCategory() {
  try {
    const categories = productCategories();
    for (let item of categories) {
      await prisma.productCategory.create({
        data: {
          category: item.Category,
          categoryCover: item.CategoryCover,
          subCategory: {
            createMany: { data: item.subCategories },
          },
        },
      });
    }
  } catch (error) {
    console.error("Error in createCategory:", error);
  }
}
async function createService() {
  for (const item of services) {
    await prisma.services.create({
      data: {
        id: item.id,
        title: item.title,
        content: item.content,
        description: item.description,
        image: item.image,
        slug: item.slug,
        status: item.status,
        reseller: item.reseller,
        sponsor: item.sponsor,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
        receiving: item.receiving,
        categoryId: item.categoryId,
        subCategoryId: item.subCategoryId,
        serviceSales: { createMany: { data: item.serviceSales } },
      },
    });
  }
}

async function productService() {
  for (const item of products) {
    await prisma.products.create({
      data: {
        title: item.title,
        content: item.content,
        description: item.description,
        image: item.image,
        duplicate: item.duplicate,
        slug: item.slug,
        status: item.status,
        reseller: item.reseller,
        sponsor: item.sponsor,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
        receiving: item.receiving,
        categoryId: item.categoryId,
        subCategoryId: item.subCategoryId,
        productSales: { createMany: { data: item.productSales } },
        productOrders: { createMany: { data: item.productOrders } },
      },
    });
  }
}
async function createUser() {
  for (const item of user) {
    await prisma.users.create({
      data: {
        id: item.id,
        email: item.email,
        username: item.username,
        password: item.password,
        role: item.role,
        active: item.active,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        profiles: {
          create: {
            id: item.profiles.id,
            fullName: item.profiles.fullName,
            accountBalance: item.profiles.accountBalance,
            referralCode: item.profiles.referralCode,
          },
        },
      },
    });
  }
}
