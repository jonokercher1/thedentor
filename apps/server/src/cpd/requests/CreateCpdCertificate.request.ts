import { IsString } from 'class-validator';

export class CreateCpdCertificateRequest {
  @IsString()
  public readonly courseId: string;
}