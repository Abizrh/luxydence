import { Request } from 'express'
import Occupant, { OccupantAttributes } from 'models/Occupant'
import ResponseError from 'modules/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Includeable, where } from 'sequelize'

class OccupantService {
  static async create(req: Request) {
    const { responsible, families } = req.body
    const serializFamily = JSON.stringify(families)
    const due = await Occupant.create(<OccupantAttributes>{
      responsible,
      families: serializFamily
    })
    return due
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

    const rawInclude: Includeable[] = []

    const query = PluginSqlizeQuery.generate(
      req,
      Occupant,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, rawInclude)
    )

    const data = await Occupant.findAll({
      include: query.include,
      where: query.where,
      order: query.order,
      offset: query.offset,
      limit: query.limit,
    })

    const total = await Occupant.count({
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
    const due = await Occupant.findByPk(id)
    if (!due) throw new ResponseError.NotFound('penghuni tidak ditemukan')
    return due
  }

  static async delete(id: string) {
    const trFound = await Occupant.findByPk(id)
    if (!trFound) throw new ResponseError.NotFound('penghuni tidak ditemukan')
    await Occupant.destroy({
      where: {
        id: trFound.id
      }
    })
  }

  static async update(id: string, req: Request) {
    const { responsible, families } = req.body

    const trFound = await Occupant.findByPk(id)
    if (!trFound) throw new ResponseError.NotFound('penghuni tidak ditemukan')

    const due = await Occupant.update(<OccupantAttributes>{
      responsible,
      families
    }, {
      where: { id: trFound.id }
    })
    console.log(due, 'dues edit')
    return due
  }
}

export default OccupantService
