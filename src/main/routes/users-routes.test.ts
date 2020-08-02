import request from 'supertest'
import app from '../config/app'

describe('Users Routes', () => {
  it('Should return 400 if not param is provided', async () => {
    await request(app)
      .get('/app/users')
      .expect(400)
  })

  it('Should return all websites on success', async () => {
    await request(app)
      .get('/app/users')
      .query({ filters: 'websites' })
      .expect(200)
  })

  it('Should return all users on success', async () => {
    await request(app)
      .get('/app/users')
      .query({ filters: 'users' })
      .expect(200)
  })

  it('Should return all users that contain the word suite in the address on success', async () => {
    await request(app)
      .get('/app/users')
      .query({ filters: 'suite' })
      .expect(200)
  })
})
