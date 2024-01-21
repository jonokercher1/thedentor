/*
  Warnings:

  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';
