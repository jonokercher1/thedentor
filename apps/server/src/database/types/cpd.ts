import { Prisma, CpdCertificate as PrismaCpdCertificate, CpdCertificateTemplate as PrismaCpdCertificateTemplate } from '@prisma/client';

export type CpdCertificate = PrismaCpdCertificate
export type CreateCpdCertificateInput = Prisma.CpdCertificateCreateInput
export type CpdCertificateFilters = Prisma.CpdCertificateWhereInput
export type CpdCertificateSelect = Prisma.CpdCertificateSelect

export type CpdCertificateTemplate = PrismaCpdCertificateTemplate