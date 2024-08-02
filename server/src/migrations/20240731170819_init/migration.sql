/*
  Warnings:

  - You are about to drop the column `usersId` on the `productfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `productfile` DROP FOREIGN KEY `productFile_usersId_fkey`;

-- AlterTable
ALTER TABLE `productfile` DROP COLUMN `usersId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `productFile` ADD CONSTRAINT `productFile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
