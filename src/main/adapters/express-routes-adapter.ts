import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'
import env from '../config/env'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      url: `${env.typiCodeUrl}`,
      body: req.body,
      filters: req.query.filters
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
