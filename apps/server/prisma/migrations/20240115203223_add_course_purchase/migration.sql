-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "_PurchasedCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PurchasedCourses_AB_unique" ON "_PurchasedCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_PurchasedCourses_B_index" ON "_PurchasedCourses"("B");

-- AddForeignKey
ALTER TABLE "_PurchasedCourses" ADD CONSTRAINT "_PurchasedCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PurchasedCourses" ADD CONSTRAINT "_PurchasedCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
