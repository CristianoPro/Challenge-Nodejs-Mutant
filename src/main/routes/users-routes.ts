import { Router } from 'express'
import { makeUsersController } from '../factories/users'
import { adaptRoute } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  router.get('/users', adaptRoute(makeUsersController()))
}
