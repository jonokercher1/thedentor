/*
  Warnings:

  - Added the required column `availablePlaces` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "availablePlaces" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';
