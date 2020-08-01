import { ApiAdapter } from './ApiAdapter'
import axios from 'axios'
import { HttpRequest } from '../presentation/protocols/http'

const makeFakeRequest = (): HttpRequest => ({
  url: 'https://jsonplaceholder.typicode.com/users',
  body: {}
})

const makeSut = (): ApiAdapter => {
  return new ApiAdapter()
}

describe('Api adapter', () => {
  it('Should call api with correct url', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axios, 'get')
    await sut.getUsers(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
  })

  it('Should return an Array', async () => {
    const sut = makeSut()
    const users = await sut.getUsers(makeFakeRequest())
    expect(Array.isArray(users)).toBe(true)
  })
})
