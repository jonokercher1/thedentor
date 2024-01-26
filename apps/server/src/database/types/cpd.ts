import { Prisma, CpdCertificate as PrismaCpdCertificate, CpdCertificateTemplate as PrismaCpdCertificateTemplate } from '@prisma/client';
import { Course } from './course';

export type CpdCertificate = PrismaCpdCertificate
export type CreateCpdCertificateInput = Prisma.CpdCertificateCreateInput
export type CpdCertificateFilters = Prisma.CpdCertificateWhereInput
export type CpdCertificateSelect = Prisma.CpdCertificateSelect
export type CpdCertificateWithCourse = CpdCertificate & { course: Course }

export type CpdCertificateTemplate = PrismaCpdCertificateTemplate