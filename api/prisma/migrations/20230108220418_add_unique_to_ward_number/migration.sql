/*
  Warnings:

  - A unique constraint covering the columns `[wardNumber]` on the table `Councillor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Councillor_wardNumber_key` ON `Councillor`(`wardNumber`);
