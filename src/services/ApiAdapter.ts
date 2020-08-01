import { Api } from '../presentation/protocols/api'
import { HttpRequest } from '../presentation/protocols/http'
import axios from 'axios'

export class ApiAdapter implements Api {
  async getUsers (httpRequest: HttpRequest): Promise<Object[]> {
    const users = await axios.get(httpRequest.url)
    return users.data
  }
}
