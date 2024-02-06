import { Module } from '@nestjs/common';
import { IStorageClient, StorageClientProvider } from '@/storage/storage.provider';

@Module({
  providers: [StorageClientProvider],
  exports: [IStorageClient],
})
export class StorageModule { }
