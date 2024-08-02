/*
  Warnings:

  - Made the column `poached` on table `productsales` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `productsales` MODIFY `poached` VARCHAR(10) NOT NULL;
