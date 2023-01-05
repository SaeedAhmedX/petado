/*
  Warnings:

  - You are about to drop the column `dogType` on the `Dog` table. All the data in the column will be lost.
  - Added the required column `type` to the `Dog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dog` DROP COLUMN `dogType`,
    ADD COLUMN `type` ENUM('STREET', 'PET') NOT NULL;
