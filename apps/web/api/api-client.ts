type RequestOptions = Exclude<RequestInit, 'body'>

export default class ApiClient {
  // TODO: use env variable for url
  private readonly BASE_URL = 'http://localhost:4000/api'

  public async POST<Response, Body>(resource: string, body?: Body, options?: RequestOptions): Promise<Response> {
    return this.makeRequest(resource, { ...options, method: 'POST', credentials: 'include' }, body)
  }

  public async GET<Response>(resource: string, options?: RequestOptions) {
    return this.makeRequest<Response, undefined>(resource, { ...options, method: 'GET', credentials: 'include' })
  }

  private async makeRequest<Response, Body>(resource: string, options: RequestOptions, body?: Body): Promise<Response> {
    const requestOptions: RequestInit = {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include'
    }

    const response = await fetch(`${this.BASE_URL}/${resource}`, requestOptions)
    const data = await response.json()

    return data as Response
  }
}