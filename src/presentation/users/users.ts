import { Controller } from '../protocols/controller'
import { ApiAdapter } from '../../services/ApiAdapter'
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest, ok } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'

export class UserController implements Controller {
  private readonly api: ApiAdapter
  constructor (api: ApiAdapter) {
    this.api = api
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest

    if (!params) {
      return badRequest(new MissingParamError('Missing Param'))
    }
    const users = await this.api.getUser(httpRequest)
    if (!users) {
      return {
        statusCode: 404,
        body: 'Not Found'
      }
    }
    if (params === 'websites') {
      const websites = users.map((user) => user.website)
      return ok({ websites })
    }
    if (params === 'users') {
      const usersInfo = users.map((user) => {
        const { name, email } = user
        const companyName = user.company.name
        return { name, email, companyName }
      })
      const orderedUsers = usersInfo.sort((a, b) => a.name > b.name ? 1 : -1)
      return ok({ orderedUsers })
    }
  }
}
