import { ApiAdapter } from './ApiAdapter'
import axios from 'axios'

const makeFakeUrl = (): string => 'https://jsonplaceholder.typicode.com/users'

const makeSut = (): ApiAdapter => {
  return new ApiAdapter()
}

describe('Api adapter', () => {
  it('Should call api with correct url', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(axios, 'get')
    await sut.getUsers(makeFakeUrl())
    expect(getSpy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
  })

  it('Should return an Array', async () => {
    const sut = makeSut()
    const users = await sut.getUsers(makeFakeUrl())
    expect(Array.isArray(users)).toBe(true)
  })
})
