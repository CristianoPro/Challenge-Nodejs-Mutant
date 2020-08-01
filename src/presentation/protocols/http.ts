export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  url: string
  params?: string
  body?: any
}
