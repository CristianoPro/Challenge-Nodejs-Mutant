import { UsersController } from '../../presentation/users/users'
import { ApiAdapter } from '../../services/ApiAdapter'

export const makeUsersController = (): UsersController => {
  const apiAdapter = new ApiAdapter()
  const usersController = new UsersController(apiAdapter)
  return usersController
}
