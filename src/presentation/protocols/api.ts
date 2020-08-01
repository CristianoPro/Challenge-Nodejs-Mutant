import { HttpRequest } from './http'

export interface Api {
  getUsers: (httpRequest: HttpRequest) => Promise<Object[]>
}
