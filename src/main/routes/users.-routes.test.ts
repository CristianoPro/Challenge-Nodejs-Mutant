import request from 'supertest'
import app from '../config/app'

describe('Users Routes', () => {
  it('Shuld return all websites on success', async () => {
    const filters = 'websites'
    await request(app)
      .get('/app/users')
      .query({ filters })
      .expect(200)
  })
})
