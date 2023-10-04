import { Request } from 'express'
import Payment, { PaymentAttributes } from 'models/Payment'
import Occupant from 'models/Occupant'
import House from 'models/House'
import ResponseError from 'modules/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Includeable, Sequelize, where } from 'sequelize'

class PaymentService {
  static async create(req: Request) {
    const payment = await Payment.create(<PaymentAttributes>{
      ...req.body
    })
    return payment
  }

  static async process(id: string, req: Request) {
    const payment = await Payment.findByPk(id)
    if (!payment) throw new ResponseError.NotFound('payment tidak ditemukan')

    await payment.update({
      ...req.body,
    });
    return payment
  }

  static async getPaginate(req: Request) {
    let { pageSize, page, filtered } = req.query
    page = page ? page : '1'
    pageSize = pageSize ? pageSize : '10'

    req.query = {
      ...req.query,
      page,
      pageSize,
    }

    const rawInclude: Includeable[] = [Occupant, House]

    const query = PluginSqlizeQuery.generate(
      req,
      Payment,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, rawInclude)
    )

    const data = await Payment.findAll({
      include: query.include,
      where: query.where,
      order: query.order,
      offset: query.offset,
      limit: query.limit,
    })

    const total = await Payment.count({
      include: query.includeCount,
      where: query.where,
    })


    return {
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / query.limit),
    }
  }

  static async getOne(id: string) {
    const payment = await Payment.findByPk(id)
    if (!payment) throw new ResponseError.NotFound('payment tidak ditemukan')
    return payment
  }

  static async delete(id: string) {
    const trFound = await Payment.findByPk(id)
    if (!trFound) throw new ResponseError.NotFound('payment tidak ditemukan')
    await Payment.destroy({
      where: {
        id: trFound.id
      }
    })
  }

  static async update(id: string, req: Request) {

    const payment = await Payment.findByPk(id)
    if (!payment) throw new ResponseError.NotFound('payment tidak ditemukan')
    await payment.update(<PaymentAttributes>{ ...req.body })
    return payment
  }
}

export default PaymentService
