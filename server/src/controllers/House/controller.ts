import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import ResponseError from 'modules/ResponseError'
import routes from 'routes'
import HouseService from './service'
import MainMiddleware from 'middlewares/MainMiddleware'

routes.post(
  '/houses',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser,
  asyncHandler(async function create(req: Request, res: Response) {
    const user = await HouseService.create(req)

    return res.status(201).json({
      message: 'success',
      data: user,
    })
  })
)

routes.get(
  '/houses',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getPaginate(req: Request, res: Response) {
    const data = await HouseService.getPaginate(req)
    return res.status(200).json(data)
  })
)

routes.get(
  '/houses/:id',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.params
    const data = await HouseService.getOne(id)
    return res.status(200).json(data)
  })
)

routes.put(
  '/houses/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.params
    const house = await HouseService.update(id, req)
    return res.status(201).json({
      message: 'update success',
      data: house,
    })
  })
)

routes.delete(
  '/houses/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function destroy(req: Request, res: Response) {
    const { id } = req.params
    await HouseService.delete(id)
    return res.status(201).json({
      message: 'iuran berhasil di hapus'
    })
    // throw new ResponseError.BadRequest('Method not implemented.')
  })
)
