import { Controller } from '../protocols/controller'
import { ApiAdapter } from '../../services/ApiAdapter'
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest, ok, notFound } from '../helpers/http-helper'
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
      return notFound('Users not found')
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
    if (params === 'suite') {
      const searchAddress = (addressUser: string): boolean => (addressUser.toLocaleLowerCase()).includes('suite')
      const userswithSuite = users.filter(user => (searchAddress(user.address.suite)))
      const usersFiltered = userswithSuite.map(user => {
        return {
          name: user.name,
          address: user.address.suite
        }
      })
      return ok({ usersFiltered })
    }
  }
}
