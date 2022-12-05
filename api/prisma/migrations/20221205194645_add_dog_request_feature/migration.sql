-- AlterTable
ALTER TABLE `Dog` ADD COLUMN `requestId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Dog` ADD CONSTRAINT `Dog_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
