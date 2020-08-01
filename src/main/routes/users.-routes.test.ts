import request from 'supertest'
import app from '../config/app'

describe('Users Routes', () => {
  it('Shuld return all websites on success', async () => {
    await request(app)
      .get('/app/websites')
      .expect(200)
  })
})
