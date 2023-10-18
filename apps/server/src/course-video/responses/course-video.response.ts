import { Expose } from 'class-transformer';
import HttpSuccessResponse from '../../common/responses/http-success.response';
import { ImageResponse } from '@/file/responses/image-response';
import { Video } from '@/database/types/video';
import { CourseVideo } from '@/database/types/course-video';

// TODO: add better typing for thumbnails
type ICourseVideoData = Partial<CourseVideo> & Partial<Video & { thumbnail: any }>;

class CourseVideoResponseData {
  @Expose()
  public readonly moduleName: string;

  @Expose()
  public readonly url: string;

  @Expose()
  public readonly title: string;

  @Expose()
  public readonly description: string;

  @Expose()
  public readonly thumbnail: ImageResponse;

  constructor(data?: ICourseVideoData) {
    Object.assign(this, data);
    this.thumbnail = new ImageResponse(data.thumbnail);
  }
}

export class CourseVideoResponse extends HttpSuccessResponse<CourseVideoResponseData> {
  constructor(data: ICourseVideoData[]) {
    const formattedData = data.map(video => new CourseVideoResponseData(video));
    super(formattedData);
  }
}