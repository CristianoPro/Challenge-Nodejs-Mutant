import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  const syncRoutes = '**/src/main/routes/**routes.ts'
  app.use('/app', router)
  fg.sync(`${syncRoutes}`).map(async file => (await import(`../../../${file}`)).default(router))
}
