import { PaginationRequest } from '@/common/requests/pagination.request';
import { CourseType } from '@prisma/client';

export class GetCoursesRequest extends PaginationRequest {
  public readonly type?: CourseType;

  public readonly search?: string;
}