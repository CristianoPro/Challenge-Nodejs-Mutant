import { UsersController } from './users'
import { ApiAdapter } from '../../services/ApiAdapter'
import { HttpRequest } from '../protocols/http'

const makeApiAdapter = (): ApiAdapter => {
  class ApiStub implements ApiAdapter {
    async getUsers (url: string): Promise<Object[]> {
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
  },
  {
    id: 3,
    name: 'Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'AP 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'tasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  }
])

const makeFakeRequest = (filters: string): HttpRequest => ({
  url: 'https://jsonplaceholder.typicode.com/users',
  filters: filters
})

interface SutTypes {
  sut: UsersController
  apiStub: ApiAdapter
}

const makeSut = (): SutTypes => {
  const apiStub = makeApiAdapter()
  const sut = new UsersController(apiStub)
  return {
    sut,
    apiStub
  }
}

describe('UsersController', () => {
  it('Should return 404 if not find users', async () => {
    const { sut, apiStub } = makeSut()
    jest.spyOn(apiStub, 'getUsers').mockReturnValue(null)
    const httpResponse = await sut.handle(makeFakeRequest('users'))
    expect(httpResponse.statusCode).toBe(404)
  })

  it('Should return 400 if not param is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest(null))
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should return all websites if is provided as param', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest('websites'))
    expect(httpResponse.body).toEqual(
      [
        'hildegard.org',
        'anastasia.net',
        'tasia.net'
      ]
    )
    expect(httpResponse.statusCode).toBe(200)
  })

  it('Should return name, email and company name if user is provided as param', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest('users'))
    expect(httpResponse.body).toEqual(
      [
        {
          name: 'Ervin Howell',
          email: 'Shanna@melissa.tv',
          companyName: 'Deckow-Crist'
        },
        {
          name: 'Howell',
          email: 'Shanna@melissa.tv',
          companyName: 'Deckow-Crist'
        },
        {
          name: 'Leanne Graham',
          email: 'Sincere@april.biz',
          companyName: 'Romaguera-Crona'
        }
      ]
    )
    expect(httpResponse.statusCode).toBe(200)
  })

  it('Should return all users that contain the word suite in the address', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest('suite'))
    expect(httpResponse.body).toEqual(
      [
        {
          name: 'Ervin Howell',
          address: 'Suite 879'
        }
      ]
    )
    expect(httpResponse.statusCode).toBe(200)
  })
})
