import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import ResponseError from 'modules/ResponseError'
import routes from 'routes'
import OccupantService from './service'
import MainMiddleware from 'middlewares/MainMiddleware'

routes.post(
  '/occupants',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser,
  asyncHandler(async function create(req: Request, res: Response) {
    const occupant = await OccupantService.create(req)
    return res.status(201).json({
      message: 'success',
      data: occupant,
    })
  })
)

routes.get(
  '/occupants',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getPaginate(req: Request, res: Response) {
    const data = await OccupantService.getPaginate(req)
    return res.status(200).json(data)
  })
)

routes.get(
  '/occupants/:id',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.params
    const data = await OccupantService.getOne(id)
    return res.status(200).json(data)
  })
)

routes.put(
  '/occupants/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.params
    const due = await OccupantService.update(id, req)
    return res.status(201).json({
      message: 'update success',
      data: due,
    })
  })
)

routes.delete(
  '/occupants/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function destroy(req: Request, res: Response) {
    const { id } = req.params
    await OccupantService.delete(id)
    return res.status(201).json({
      message: 'iuran berhasil di hapus'
    })
    // throw new ResponseError.BadRequest('Method not implemented.')
  })
)
