import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/repositories/user.repository';
import { User, UserFilters, UserSelectFields } from '@/database/types/user';

@Injectable()
export class UserCourseService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async isCourseOwnedByUser(courseId: string, userId: string): Promise<boolean> {
    const ownedCourse = await this.userRepository.findMany<UserFilters, UserSelectFields>({
      purchasedCourses: {
        some: {
          id: courseId,
        },
      },
      id: userId,
    });

    return !!ownedCourse.length;
  }

  public async attachCourseToUser(courseId: string, userId: string): Promise<User> {
    return this.userRepository.update(userId, {
      purchasedCourses: {
        connect: {
          id: courseId,
        },
      },
    });
  }

  public async hasUserAttendedCourse(courseId: string, userId: string): Promise<boolean> {
    // TODO: This needs to check attendance records once we have that built
    return this.isCourseOwnedByUser(courseId, userId);
  }
}