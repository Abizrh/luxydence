import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import ResponseError from 'modules/ResponseError'
import routes from 'routes'
import DueService from './service'
import MainMiddleware from 'middlewares/MainMiddleware'

routes.post(
  '/dues',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser,
  asyncHandler(async function create(req: Request, res: Response) {
    const user = await DueService.create(req)
    return res.status(201).json({
      message: 'success',
      data: user,
    })
  })
)

routes.get(
  '/dues',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getPaginate(req: Request, res: Response) {
    const data = await DueService.getPaginate(req)
    return res.status(200).json(data)
  })
)

routes.get(
  '/dues/:id',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.params
    const data = await DueService.getOne(id)
    return res.status(200).json(data)
  })
)

routes.put(
  '/dues/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.params
    const due = await DueService.update(id, req)
    return res.status(201).json({
      message: 'update success',
      data: due,
    })
  })
)

routes.delete(
  '/dues/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function destroy(req: Request, res: Response) {
    const { id } = req.params
    await DueService.delete(id)
    return res.status(201).json({
      message: 'iuran berhasil di hapus'
    })
    // throw new ResponseError.BadRequest('Method not implemented.')
  })
)
