import HttpSuccessResponse, { HttpPaginatedResponse } from '@/common/responses/http-success.response';
import { Category } from '@/database/types/category';
import { Course } from '@/database/types/course';
import { User } from '@/database/types/user';
import { Expose, Type } from 'class-transformer';

// {
//   id: '123',
//   name: 'Polishing The Anterior Composite Restoration',
//   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
//   cpdValue: 12,
//   startDate: new Date(),
//   endDate: dayjs().add(2, 'days').toDate(),
//   previewImage: 'https://images.unsplash.com/photo-1468493858157-0da44aaf1d13',
//   dentor: {
//     name: 'Jason Smithson'
//   },
//   categories: [
//     { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
//   ]
// },

type ICourseCategoryData = Partial<Category>;
type ICourseDentorData = Partial<User>;
type ICourseData = Partial<Course> & { dentor: ICourseDentorData; category: ICourseCategoryData[] };

class CourseCategoryData {
  @Expose()
  public readonly slug: string;

  @Expose()
  public readonly label: string;

  constructor(data?: ICourseCategoryData) {
    Object.assign(this, data);
  }
}

class CourseDentorData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  constructor(data?: ICourseDentorData) {
    Object.assign(this, data);
  }
}

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
  @Type(() => CourseDentorData)
  public readonly dentor: CourseDentorData;

  @Expose()
  @Type(() => CourseCategoryData)
  public readonly categories: CourseCategoryData[];

  constructor(courseData?: ICourseData) {
    Object.assign(this, courseData);
    this.dentor = new CourseDentorData(courseData.dentor);
    this.categories = courseData.category.map(category => new CourseCategoryData(category));
  }
}

export class CourseResponse extends HttpSuccessResponse<CourseData> {
  constructor(data?: ICourseData) {
    super(new CourseData(data));
  }

  // TOOD: work out how to make this generic
  public static paginate(data: ICourseData[], total: number, page: number) {
    const dataResponse = data.map((item) => new CourseData(item));

    return new HttpPaginatedResponse(dataResponse, total, page);
  }
}