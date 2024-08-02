-- AlterTable
ALTER TABLE `productorders` ADD COLUMN `status` ENUM('create', 'success', 'refund', 'cancel') NOT NULL DEFAULT 'create';
