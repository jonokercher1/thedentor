/*
  Warnings:

  - You are about to drop the `DentorReviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dentorId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DentorReviews" DROP CONSTRAINT "DentorReviews_dentorId_fkey";

-- DropForeignKey
ALTER TABLE "DentorReviews" DROP CONSTRAINT "DentorReviews_reviewId_fkey";

-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "dentorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "DentorReviews";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dentorId_fkey" FOREIGN KEY ("dentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
