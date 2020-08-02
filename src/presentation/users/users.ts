import { ApiAdapter } from '../../services/ApiAdapter'
import { Controller, HttpResponse, HttpRequest } from '../protocols'
import { badRequest, ok, notFound } from '../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../errors'
import { storeLog } from '../../services/elasticsearch'

interface usersFiltered {
  name: string
  address: string
}

interface orderedUsers {
  name: string
  email: string
  companyName: string
}

export class UsersController implements Controller {
  private readonly api: ApiAdapter
  constructor (api: ApiAdapter) {
    this.api = api
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validsFilters = ['websites', 'users', 'suite']
    const { filters } = httpRequest

    if (!filters) { return badRequest(new MissingParamError('filters')) }

    if (!validsFilters.includes(filters)) { return badRequest(new InvalidParamError(filters)) }

    const users = await this.api.getUsers(httpRequest.url)
    if (!users) {
      return notFound('Users not found')
    }

    const acceptedParams = {
      websites (users: any[]) {
        const websites = users.map(user => { return { web: user.website } })
        return websites
      },
      users (users: any[]): orderedUsers[] {
        const usersInfo = users.map((user) => {
          const { name, email } = user
          const companyName = user.company.name
          return { name, email, companyName }
        })
        const orderedUsers = usersInfo.sort((a, b) => a.name > b.name ? 1 : -1)
        return orderedUsers
      },
      suite (users: any[]): usersFiltered[] {
        const searchAddress = (addressUser: string): boolean => (addressUser.toLocaleLowerCase()).includes('suite')
        const userswithSuite = users.filter(user => (searchAddress(user.address.suite)))
        const usersFiltered = userswithSuite.map(user => {
          return {
            name: user.name,
            address: user.address.suite
          }
        })
        return usersFiltered
      }
    }
    const search = acceptedParams[filters]
    const data = search(users)
    await storeLog(data)
    return ok(data)
  }
}
