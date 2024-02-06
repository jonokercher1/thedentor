import HttpSuccessResponse from '@/common/responses/http-success.response';
import { CpdCertificate } from '@/database/types/cpd';
import { Expose } from 'class-transformer';

type ICpdCertificateData = Partial<CpdCertificate>;

export class CpdCertificateData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly fileUrl: string;

  constructor(cpdCertificateData?: ICpdCertificateData) {
    Object.assign(this, cpdCertificateData);
  }
}

export class CpdCertificateResponse extends HttpSuccessResponse<CpdCertificateData> {
  private static readonly transformerClass = CpdCertificateData;

  constructor(data?: ICpdCertificateData) {
    super(new CpdCertificateResponse.transformerClass(data));
  }
}