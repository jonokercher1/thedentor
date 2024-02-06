import { promises as fs } from 'fs';
import { StorageClient } from '@/storage/types/storage-client';
import { join } from 'path';
import { URL } from 'url';

export class LocalStorageClient implements StorageClient {
  private readonly rootFolder: string = 'public';

  private readonly baseUrl: string = 'http://localhost:4000';

  private readonly diskLocation: string = `${__dirname}/../../../${this.rootFolder}`;

  public async storeFile(name: string, location: string, contents: any): Promise<string> {
    const folderToWriteTo = join(this.diskLocation, location);
    const unresolvedFilePath = join(location, name);
    const filePathForWrite = join(folderToWriteTo, name);

    await fs.mkdir(folderToWriteTo, { recursive: true });
    await fs.writeFile(filePathForWrite, contents, { encoding: 'utf-8' });

    return unresolvedFilePath;
  }

  public generateUrlFromPath(path: string): string {
    return new URL(`${this.rootFolder}/${path}`, this.baseUrl).toString();
  }
}