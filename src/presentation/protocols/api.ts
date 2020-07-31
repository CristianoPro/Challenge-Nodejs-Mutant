import { HttpRequest } from './http'

export interface Api {
  getUser: (httpRequest: HttpRequest) => Promise<Object[]>
}
