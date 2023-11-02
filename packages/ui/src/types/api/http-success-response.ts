export interface HttpSuccessResponse<T> {
  data?: T
  message: string
  statusCode: number
}

export interface HttpSuccessPaginatedResponse<T> extends HttpSuccessResponse<T> {
  total: number
  page: number
}