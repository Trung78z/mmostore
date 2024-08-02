const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const Papa = require("papaparse");
const fs = require("fs");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const port = 3001;
app.get("/download", (req, res) => {
  res.download("csv.csv", "account.csv", (err) => {
    if (err) {
      console.error("Error downloading CSV file:", err);
      res.status(500).send("Error downloading file");
    } else {
      console.log("Download successfully");
    }
  });
});
const generateRandomEmail = () => {
  const randomString = crypto.randomBytes(8).toString("hex");
  return `${randomString}@gmail.com`;
};

// Function to generate a random password
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

// Generate 20 random objects
const generateProducts = () => {
  let products = [];
  for (let i = 0; i < 20; i++) {
    let product = {
      account: generateRandomEmail(),
      password: generateRandomPassword(),
      sold: false,
      productSaleId: 1,
    };
    products.push(product);
  }
  return products;
};

const products = generateProducts();
console.log(products);
const csv = Papa.unparse(products);

const findAccountNoSold = async () => {
  const accountsToUpdate = await prisma.productAccount.findMany({
    where: { productSaleId: 1, sold: true },
  });
  const accountIds = accountsToUpdate.map((account) => account.id);
  await prisma.productAccount.updateMany({
    where: { id: { in: accountIds } },
    data: { sold: false },
  });
  return accountsToUpdate;
};
// findAccountNoSold();
const create = async () => {
  try {
    await prisma.productAccount.createMany({ data: products });
  } catch (error) {
    console.log(error);
  }
};
const find = async () => {
  const msg = await prisma.productAccount.findMany({
    where: { sold: false },
    take: 3,
  });
  console.log(msg);
};
// find();
// create();
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
