-- DropForeignKey
ALTER TABLE "CourseFeedbackQuestion" DROP CONSTRAINT "CourseFeedbackQuestion_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseFeedbackResponse" DROP CONSTRAINT "CourseFeedbackResponse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseFeedbackResponse" DROP CONSTRAINT "CourseFeedbackResponse_userId_fkey";

-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';

-- AddForeignKey
ALTER TABLE "CourseFeedbackQuestion" ADD CONSTRAINT "CourseFeedbackQuestion_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFeedbackResponse" ADD CONSTRAINT "CourseFeedbackResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFeedbackResponse" ADD CONSTRAINT "CourseFeedbackResponse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
