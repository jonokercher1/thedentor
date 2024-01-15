import { Prisma, User as PrismaUser } from '@prisma/client';

export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;
export type User = PrismaUser;
export type UserFilters = Prisma.UserWhereInput;
export type UserSelectFields = Prisma.UserSelect;
export type OptionalUserCreateData = Partial<Pick<User, 'roleName' | 'gdcNumber' | 'name' | 'phone' | 'bio'>>;