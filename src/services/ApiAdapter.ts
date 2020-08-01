import { Api } from '../presentation/protocols/api'
import { HttpRequest } from '../presentation/protocols/http'
import axios from 'axios'

export class ApiAdapter implements Api {
  async getUser (httpRequest: HttpRequest): Promise<any[]> {
    const users = await axios.get(httpRequest.url)
    return users.data
  }
}
