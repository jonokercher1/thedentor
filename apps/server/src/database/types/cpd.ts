import {
  Prisma,
  CpdCertificate as PrismaCpdCertificate,
  CpdCertificateTemplate as PrismaCpdCertificateTemplate,
  CpdCertificateTemplateField as PrismaCpdCertificateTemplateField,
  CpdCertificateTemplateFieldType as PrismaCpdCertificateTemplateFieldType
} from '@prisma/client';
import { Course } from './course';

export type CpdCertificate = PrismaCpdCertificate
export type CreateCpdCertificateInput = Prisma.CpdCertificateCreateInput
export type CpdCertificateFilters = Prisma.CpdCertificateWhereInput
export type CpdCertificateSelect = Prisma.CpdCertificateSelect
export type CpdCertificateWithCourse = CpdCertificate & { course: Course }

export type CpdCertificateTemplate = PrismaCpdCertificateTemplate
export type CpdCertificateTemplateFilters = Prisma.CpdCertificateTemplateWhereInput
export type CpdCertificateTemplateSelect = Prisma.CpdCertificateTemplateSelect
export type CpdCertificateTemplateWithFields = CpdCertificateTemplate & { fields: CpdCertificateTemplateField[] }

export type CpdCertificateTemplateField = PrismaCpdCertificateTemplateField
export const CpdCertificateTemplateFieldType = PrismaCpdCertificateTemplateFieldType;
export type CpdCertificateTemplateFieldType = (typeof CpdCertificateTemplateFieldType)[keyof typeof CpdCertificateTemplateFieldType]
export type CpdCertificateTemplateFieldWithValue = CpdCertificateTemplateField & { value: string | number } // TODO: work out where these types should actually live