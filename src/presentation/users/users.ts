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
  }
}
