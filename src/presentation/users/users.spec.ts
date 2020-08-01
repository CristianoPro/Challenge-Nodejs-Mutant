import { UserController } from './users'
import { ApiAdapter } from '../../services/ApiAdapter'
import { HttpRequest } from '../protocols/http'

const makeFakeRequest = (): HttpRequest => ({
  url: 'https://jsonplaceholder.typicode.com/users',
  body: {}
})

interface SutTypes {
  sut: UserController
  apiStub: ApiAdapter
}

const makeSut = (): SutTypes => {
  const apiStub = new ApiAdapter()
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
    console.log(httpResponse)
    expect(httpResponse.statusCode).toBe(404)
  })
})
