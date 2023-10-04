import PaymentService from 'controllers/Payment/service'
import { Request } from 'express'
import Due from 'models/Due'
import House, { HouseAttributes } from 'models/House'
import Occupant from 'models/Occupant'
import Payment, { PaymentAttributes } from 'models/Payment'
import ResponseError from 'modules/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Includeable } from 'sequelize'

class HouseService {
  static async create(req: Request) {
    const house = await House.create(<HouseAttributes>{
      ...req.body
    })

    const totalAmount = await Due.sum('total')

    await Payment.create(<PaymentAttributes><unknown>{ total: totalAmount, status: 'new', house_id: house.id, occupant_id: house.occupant_id, total_paid: 0, paid_at: new Date() })
    
    return house
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

    const rawInclude: Includeable[] = [Occupant]

    const query = PluginSqlizeQuery.generate(
      req,
      House,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, rawInclude)
    )

    const data = await House.findAll({
      include: query.include,
      where: query.where,
      order: query.order,
      offset: query.offset,
      limit: query.limit,
    })

    const total = await House.count({
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
    const due = await House.findByPk(id, {
      include: Occupant
    })
    if (!due) throw new ResponseError.NotFound('iuran tidak ditemukan')
    return due
  }

  static async delete(id: string) {
    const trFound = await House.findByPk(id)
    if (!trFound) throw new ResponseError.NotFound('iuran tidak ditemukan')
    await House.destroy({
      where: {
        id: trFound.id
      }
    })
  }

  static async update(id: string, req: Request) {

    const trFound = await House.findByPk(id)
    if (!trFound) throw new ResponseError.NotFound('iuran tidak ditemukan')

    const due = await House.update(<HouseAttributes>{
      ...req.body
    }, {
      where: { id: trFound.id }
    })
    console.log(due, 'dues edit')
    return due
  }
}

export default HouseService
