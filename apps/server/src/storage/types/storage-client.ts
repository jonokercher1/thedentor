
export interface StorageClient {
  storeFile: (name: string, location: string, contents: any) => Promise<string>
  generateUrlFromPath: (path: string) => string
}