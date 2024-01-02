import { HttpSuccessResponse } from "./http-success-response";

export interface HttpSucccessPaginatedResponse<T> extends HttpSuccessResponse<T> {
  total: number;
  page: number;
}