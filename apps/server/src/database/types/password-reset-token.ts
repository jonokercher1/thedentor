import { Prisma, PasswordResetToken as PrismaPasswordResetToken } from '@prisma/client';

export type PasswordResetToken = PrismaPasswordResetToken

// TODO: there must be a better way to do this
export type PasswordResetTokenFields = Prisma.PasswordResetTokenSelect