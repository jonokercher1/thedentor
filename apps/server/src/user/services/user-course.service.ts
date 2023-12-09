import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/repositories/user.repository';
import { Course } from '@/database/types/course';
import { User, UserFilters, UserSelectFields } from '@/database/types/user';

@Injectable()
export class UserCourseService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async isCourseOwnedByUser(course: Course, user: User): Promise<boolean> {
    const ownedCourse = await this.userRepository.findMany<UserFilters, UserSelectFields>({
      courses: {
        some: {
          id: course.id,
        },
      },
      id: user.id,
    });

    return !!ownedCourse.length;
  }

  public async attachCourseToUser(course: Course, user: User): Promise<User> {
    return this.userRepository.update(user.id, {
      courses: {
        connect: {
          id: course.id,
        },
      },
    });
  }
}