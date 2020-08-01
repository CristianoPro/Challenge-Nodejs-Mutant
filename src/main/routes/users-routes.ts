import { Router } from 'express'

export default (router: Router): void => {
  router.get('/websites', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
