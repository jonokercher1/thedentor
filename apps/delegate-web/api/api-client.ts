
import { redirect } from 'next/navigation'

export type RequestOptions = Exclude<RequestInit, 'body'>

export abstract class ApiClient {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  public async GET<Response>(resource: string, options?: RequestOptions) {
    return this.makeRequest<Response, undefined>(resource, { ...options, method: 'GET' })
  }

  public async POST<Response, Body>(resource: string, body?: Body, options?: RequestOptions): Promise<Response> {
    return this.makeRequest(resource, { ...options, method: 'POST' }, body)
  }

  public async PUT<Response, Body>(resource: string, body?: Body, options?: RequestOptions): Promise<Response> {
    return this.makeRequest(resource, { ...options, method: 'PUT' }, body)
  }

  public async PATCH<Response, Body>(resource: string, body?: Body, options?: RequestOptions): Promise<Response> {
    return this.makeRequest(resource, { ...options, method: 'PATCH' }, body)
  }

  protected async makeRequest<Response, Body>(resource: string, options: RequestOptions, body?: Body): Promise<Response> {
    const requestOptions: RequestInit = {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    }

    const response = await fetch(`${this.BASE_URL}/${resource}`, requestOptions)

    if (response.status === 401) {
      // TOOD: test if this works on a client call
      redirect('/login')
    }

    const data = await response.json()

    return data as Response
  }
}
