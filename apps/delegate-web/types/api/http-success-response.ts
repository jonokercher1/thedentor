export interface HttpSuccessResponse<T> {
  data?: T
  message: string
  statusCode: number
}