import { Api } from '../presentation/protocols/api'
import axios from 'axios'

export class ApiAdapter implements Api {
  async getUsers (url: string): Promise<Object[]> {
    const users = await axios.get(url)
    return users.data
  }
}
