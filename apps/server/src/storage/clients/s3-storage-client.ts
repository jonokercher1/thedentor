import { StorageClient } from '@/storage/types/storage-client';

export class S3StorageClient implements StorageClient {
  storeFile: any;
  generateUrlFromPath: any;
}