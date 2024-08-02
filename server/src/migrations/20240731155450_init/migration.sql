-- DropForeignKey
ALTER TABLE `productaccount` DROP FOREIGN KEY `productAccount_productSalesId_fkey`;

-- AddForeignKey
ALTER TABLE `productAccount` ADD CONSTRAINT `productAccount_productSaleId_fkey` FOREIGN KEY (`productSaleId`) REFERENCES `productSales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
