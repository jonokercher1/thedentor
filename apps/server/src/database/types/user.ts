import { Prisma, User as PrismaUser } from '@prisma/client';

export type CreateUserInput = Prisma.UserCreateInput;

export type UpdateUserInput = Prisma.UserUpdateInput;

export type User = PrismaUser;