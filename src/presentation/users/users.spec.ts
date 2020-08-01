import { UserController } from './users'
import { ApiAdapter } from '../../services/ApiAdapter'
import { HttpRequest } from '../protocols/http'

const makeApiAdapter = (): ApiAdapter => {
  class ApiStub implements ApiAdapter {
    async getUser (httpRequest: HttpRequest): Promise<Object[]> {
      return await Promise.resolve(makeFakeUsers())
    }
  }
  return new ApiStub()
}

const makeFakeUsers = (): Object[] => ([
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  }
])

const makeFakeRequest = (params?: string): HttpRequest => ({
  url: 'https://jsonplaceholder.typicode.com/users',
  params: params
})

interface SutTypes {
  sut: UserController
  apiStub: ApiAdapter
}

const makeSut = (): SutTypes => {
  const apiStub = makeApiAdapter()
  const sut = new UserController(apiStub)
  return {
    sut,
    apiStub
  }
}

describe('UserController', () => {
  it('Should return 404 if not find users', async () => {
    const { sut, apiStub } = makeSut()
    jest.spyOn(apiStub, 'getUser').mockReturnValue(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(404)
  })

  it('Should return all websites if is provided as param', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest('websites'))
    expect(httpResponse.body).toEqual({
      websites: [
        'hildegard.org',
        'anastasia.net'
      ]
    })
    expect(httpResponse.statusCode).toBe(200)
  })
})
