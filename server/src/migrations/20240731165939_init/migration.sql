/*
  Warnings:

  - You are about to drop the column `urlFile` on the `productorders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productorders` DROP COLUMN `urlFile`;

-- CreateTable
CREATE TABLE `productFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productOrdersId` VARCHAR(191) NULL,
    `usersId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productFile` ADD CONSTRAINT `productFile_productOrdersId_fkey` FOREIGN KEY (`productOrdersId`) REFERENCES `productOrders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productFile` ADD CONSTRAINT `productFile_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
