import asyncHandler from 'helpers/asyncHandler'
import routes from 'routes'

import { NextFunction, Request, Response } from 'express'
import MainMiddleware from 'middlewares/MainMiddleware'
import AuthService from './service'

routes.post(
  '/auth/login',
  // @ts-ignore
  asyncHandler(async function login(req: Request, res: Response) {
    const { email, password } = req.body
    console.log(email, password)
    const token = await AuthService.login(email, password)
    const data = {
      message: 'success',
      token: token.access,
      refreshToken: token.refresh,
      statusCode: 201
    }
    return res.status(201).json({
      data
    })
  })
)

routes.post(
  '/auth/refresh',
  MainMiddleware.EnsureTokenUser,
  // @ts-ignore
  asyncHandler(async function refresh(req: Request, res: Response) {
    const user = req.user
    const token = await AuthService.generateAccessToken(user.email, null)
    return res.status(201).json({
      message: 'success',
      token: token.access,
      refreshToken: token.refresh,
    })
  })
)
