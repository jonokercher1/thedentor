'use client'

import { useQueryState } from './useQueryState'
import { HttpSuccessResponse } from '../types/api/http-success-response'

type ApiRequestFunction<Response, Body> = ((body: Body | undefined) => Response | Promise<Response>) | (() => Response | Promise<Response>)

interface UseApiRequestArgs<Response extends HttpSuccessResponse<Response['data']>, Body = {}> {
  request: ApiRequestFunction<Response, Body>
  onSuccess?: (response?: Response) => void
  onError?: (error: any) => void
  defaultErrorMessage?: string
  setFieldError?: (name: string, { message }: { message: string }) => void
}

interface UseApiRequestResponse<Body> {
  isLoading: boolean
  isSuccess: boolean
  error?: string
  sendApiRequest: (body?: Body) => void
}

export const useApiRequest = <Response extends HttpSuccessResponse<Response['data']>, Body = undefined>(args: UseApiRequestArgs<Response, Body>): UseApiRequestResponse<Body> => {
  const { isLoading, isSuccess, error, setQueryError, queryLoading, querySuccessful } = useQueryState()

  const sendApiRequest = async (body?: Body): Promise<void> => {
    try {
      queryLoading()
      const response = await args.request(body)
      console.log("🚀 ~ sendApiRequest ~ response:", response)

      if (response.statusCode > 299) {
        if (response.statusCode === 422 && args.setFieldError) {
          const errorKeys = Object.keys((response as any).error)
          errorKeys.forEach((errorKey: any) => {
            args.setFieldError!(errorKey, { message: (response as any).error[errorKey] })
          })
        }

        // TODO: frontend logging can log here for debugging
        throw new Error(response.message)
      }

      querySuccessful()

      if (args.onSuccess) {
        args.onSuccess(response)
      }
    } catch (e: any) {
      console.log("🚀 ~ sendApiRequest ~ e:", e)
      setQueryError(e.message)

      if (args.onError) {
        args.onError(e)
      }
    }
  }

  return {
    isLoading,
    isSuccess,
    error,
    sendApiRequest
  }
};
