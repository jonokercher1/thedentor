import { StorageClient } from '@/storage/types/storage-client';
import { LocalStorageClient } from '@/storage/clients/local-storage-client';
import { S3StorageClient } from '@/storage/clients/s3-storage-client';

const getStorageClient = (): StorageClient => {
  const logger = process.env.FILE_STORAGE_CLIENT ?? 'filesystem';

  switch (logger) {
    case 's3':
    case 'spaces':
      return new S3StorageClient;

    case 'filesystem':
    default:
      return new LocalStorageClient;
  }
};

export const IStorageClient = Symbol('IStorageClient');

export const StorageClientProvider = {
  provide: IStorageClient,
  useValue: getStorageClient(),
};