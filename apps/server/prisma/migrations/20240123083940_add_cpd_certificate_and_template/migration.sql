-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "CpdCertificateTemplate" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CpdCertificateTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CpdCertificate" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CpdCertificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CpdCertificateTemplate" ADD CONSTRAINT "CpdCertificateTemplate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CpdCertificate" ADD CONSTRAINT "CpdCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CpdCertificate" ADD CONSTRAINT "CpdCertificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
