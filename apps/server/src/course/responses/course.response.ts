import HttpSuccessResponse, { HttpPaginatedResponse } from '@/common/responses/http-success.response';
import { CourseCategoryResponseData, ICourseCategoryData } from '@/course-category/responses/course-category.response';
import { Course } from '@/database/types/course';
import { User } from '@/database/types/user';
import { DentorData } from '@/dentor/responses/dentor.response';
import { Expose, Type } from 'class-transformer';

type ICourseDentorData = Partial<User>;
type ICourseData = Partial<Course> & { dentor: ICourseDentorData; category: ICourseCategoryData[] };

class CourseData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly description: string;

  @Expose()
  public readonly cpdValue: number;

  @Expose()
  public readonly startDate: string;

  @Expose()
  public readonly endDate: string;

  @Expose()
  @Type(() => DentorData)
  public readonly dentor: DentorData;

  @Expose()
  @Type(() => CourseCategoryResponseData)
  public readonly categories: CourseCategoryResponseData[];

  constructor(courseData?: ICourseData) {
    Object.assign(this, courseData);
    this.dentor = new DentorData(courseData.dentor);
    this.categories = courseData.category.map(category => new CourseCategoryResponseData(category));
  }
}

export class CourseResponse extends HttpSuccessResponse<CourseData> {
  private static readonly transformerClass = CourseData;

  constructor(data?: ICourseData) {
    super(new CourseResponse.transformerClass(data));
  }

  // TOOD: work out how to make this generic
  public static paginate(data: ICourseData[], total: number, page: number) {
    const dataResponse = data.map((item) => new CourseResponse.transformerClass(item));

    return new HttpPaginatedResponse(dataResponse, total, page);
  }
}