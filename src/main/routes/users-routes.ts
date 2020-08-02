import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeUsersController } from '../factories/users'

export default (router: Router): void => {
  router.get('/users', adaptRoute(makeUsersController()))
}
