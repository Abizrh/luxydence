import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'helpers/asyncHandler'
import ResponseError from 'modules/ResponseError'
import routes from 'routes'
import PaymentService from './service'
import MainMiddleware from 'middlewares/MainMiddleware'

routes.post(
  '/payments',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser,
  asyncHandler(async function create(req: Request, res: Response) {
    const payment = await PaymentService.create(req)
    return res.status(201).json({
      message: 'success',
      data: payment,
    })
  })
)

routes.get(
  '/payments',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getPaginate(req: Request, res: Response) {
    const data = await PaymentService.getPaginate(req)
    return res.status(200).json(data)
  })
)

routes.get(
  '/payments/:id',
  // @ts-ignore
  MainMiddleware.EnsureTokenUser, asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.params
    const data = await PaymentService.getOne(id)
    return res.status(200).json(data)
  })
)

routes.put(
  '/payments/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.params
    const due = await PaymentService.update(id, req)
    return res.status(201).json({
      message: 'update success',
      data: due,
    })
  })
)

routes.put(
  '/payments/process/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.params
    const due = await PaymentService.process(id, req)
    return res.status(201).json({
      message: 'update success',
      data: due,
    })
  })
)

routes.delete(
  '/payments/:id',
  MainMiddleware.EnsureTokenUser, asyncHandler(async function destroy(req: Request, res: Response) {
    const { id } = req.params
    await PaymentService.delete(id)
    return res.status(201).json({
      message: 'iuran berhasil di hapus'
    })
    // throw new ResponseError.BadRequest('Method not implemented.')
  })
)
