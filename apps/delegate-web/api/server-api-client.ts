import 'server-only'
import { cookies } from 'next/headers'
import { ApiClient, type RequestOptions } from '@/api/api-client'

export class ServerApiClient extends ApiClient {
  protected async makeRequest<Response, Body>(resource: string, options: RequestOptions, body?: Body): Promise<Response> {
    const headers = {
      ...options.headers,
      'Cookie': cookies().toString()
    }

    return super.makeRequest(resource, { ...options, headers }, body)
  }
}