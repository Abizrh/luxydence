import { Request } from 'express'
import Due, { DueAttributes } from 'models/Due'
import ResponseError from 'modules/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Includeable, where, Op } from 'sequelize'

class DueService {
  static async create(req: Request) {
    const { total, type, description } = req.body

    const due = await Due.create(<DueAttributes>{
      type,
      total,
      description
    })
    return due
  }

  static async getPaginate(req: Request) {
    let { pageSize, page, filtered, keyword } = req.query
    page = page ? page : '1'
    pageSize = pageSize ? pageSize : '10'
    let condition: any = {}

    req.query = {
      ...req.query,
      page,
      pageSize,
    }
    
    if(keyword) {
      condition.type = {
        [Op.like]: keyword ? `%${keyword}%` : `%%`
      }
    }

    const rawInclude: Includeable[] = []

    const query = PluginSqlizeQuery.generate(
      req,
      Due,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, rawInclude)
    )

    query.where = condition

    const data = await Due.findAll({
      include: query.include,
      where: query.where,
      order: query.order,
      offset: query.offset,
      limit: query.limit,
    })

    console.log('OCCU: ', query)

    const total = await Due.count({
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
    const due = await Due.findByPk(id)
    if (!due) throw new ResponseError.NotFound('iuran tidak ditemukan')
    return due
  }

  static async delete(id: string) {
    const trFound = await Due.findByPk(id)
    if (!trFound) throw new ResponseError.NotFound('iuran tidak ditemukan')
    await Due.destroy({
      where: {
        id: trFound.id
      }
    })
  }

  static async update(id: string, req: Request) {
    const { total, type, description } = req.body
    const due = await Due.findByPk(id)
    if (!due) throw new ResponseError.NotFound('iuran tidak ditemukan')
    await due.update(<DueAttributes>{total, type, description})
    return due
  }
}

export default DueService
