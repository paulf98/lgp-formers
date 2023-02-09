/*
  Warnings:

  - You are about to drop the column `yearOfGraduation` on the `Student` table. All the data in the column will be lost.
  - Added the required column `leftInYear` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedInYear` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `yearOfGraduation`,
    ADD COLUMN `graduated` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `leftInYear` INTEGER NOT NULL,
    ADD COLUMN `startedInYear` INTEGER NOT NULL;
