import { HttpSuccessResponse } from "@/types/api/http-success-response"

export interface ApiHookArgs<Data> {
  onSuccess?: (data: Data) => void
  onError?: (e: Error) => void
}