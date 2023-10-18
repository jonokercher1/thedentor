import { File as PrismaFile, FileSize as PrismaFileSize } from '@prisma/client';

export type File = PrismaFile

export const FileSize = PrismaFileSize;
export type FileSize = (typeof FileSize)[keyof typeof FileSize]