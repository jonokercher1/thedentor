-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;
