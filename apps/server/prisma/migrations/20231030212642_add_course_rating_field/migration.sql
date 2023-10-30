-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 day';
