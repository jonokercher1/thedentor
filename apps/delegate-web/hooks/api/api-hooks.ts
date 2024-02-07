export interface ApiHookArgs<Data> {
  onSuccess?: (data: Data) => void
  onError?: (e: Error) => void
}