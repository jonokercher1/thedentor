-- CreateEnum
CREATE TYPE "CpdCertificateTemplateFieldType" AS ENUM ('CourseName', 'DentorName', 'DentorGdcNumber', 'CourseObjectives');

-- AlterTable
ALTER TABLE "CpdCertificate" ADD COLUMN     "templateId" TEXT;

-- AlterTable
ALTER TABLE "OneTimePassword" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "CpdCertificateTemplateField" (
    "id" TEXT NOT NULL,
    "type" "CpdCertificateTemplateFieldType" NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "templateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CpdCertificateTemplateField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CpdCertificateTemplateField" ADD CONSTRAINT "CpdCertificateTemplateField_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "CpdCertificateTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CpdCertificate" ADD CONSTRAINT "CpdCertificate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "CpdCertificateTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
