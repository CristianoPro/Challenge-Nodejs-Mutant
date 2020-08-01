export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  url: string
  filters: any
  body?: any
}
