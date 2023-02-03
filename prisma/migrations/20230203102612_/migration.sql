/*
  Warnings:

  - You are about to drop the column `schoolId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schoolId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_schoolId_idx` ON `User`;

-- DropIndex
DROP INDEX `User_studentId_idx` ON `User`;

-- DropIndex
DROP INDEX `User_teacherId_idx` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `schoolId`,
    DROP COLUMN `studentId`,
    DROP COLUMN `teacherId`;

-- CreateIndex
CREATE UNIQUE INDEX `Student_userId_key` ON `Student`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_schoolId_key` ON `Student`(`schoolId`);

-- CreateIndex
CREATE INDEX `Teacher_userId_idx` ON `Teacher`(`userId`);
