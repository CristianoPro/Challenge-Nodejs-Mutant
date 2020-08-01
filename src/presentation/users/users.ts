import { Controller } from '../protocols/controller'
import { ApiAdapter } from '../../services/ApiAdapter'
import { HttpResponse, HttpRequest } from '../protocols/http'

export class UserController implements Controller {
  private readonly api: ApiAdapter
  constructor (api: ApiAdapter) {
    this.api = api
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const users = await this.api.getUser(httpRequest)
    if (!users) {
      return {
        statusCode: 404,
        body: 'Not Found'
      }
    }
    if (httpRequest.params === 'websites') {
      const websites = users.map((user) => user.website)
      return {
        statusCode: 200,
        body: {
          websites
        }
      }
    }
    if (httpRequest.params === 'user') {
      const usersInfo = users.map((user) => {
        const { name, email } = user
        const companyName = user.company.name
        return { name, email, companyName }
      })
      const orderedUsers = usersInfo.sort((a, b) => a.name > b.name ? 1 : -1)
      return {
        statusCode: 200,
        body: {
          orderedUsers
        }
      }
    }
  }
}
