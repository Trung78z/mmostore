-- CreateTable
CREATE TABLE `withdraws` (
    `id` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `banking` VARCHAR(40) NOT NULL,
    `accountBank` VARCHAR(40) NOT NULL,
    `status` ENUM('success', 'cancel', 'ide', 'error') NOT NULL DEFAULT 'ide',
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `withdraws` ADD CONSTRAINT `withdraws_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
