import { Model, Optional } from 'sequelize'
import { Associate } from 'types/sequelize'

import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface HouseAttributes {
  id: number
  house_number: string
  status: string
  occupant_id: number
  owner: string
}

interface HouseCreationAttributes extends Optional<HouseAttributes, 'id'> {}

export interface HouseInstance
  extends Model<HouseAttributes, HouseCreationAttributes>,
    HouseAttributes {}

const House: typeof Model &
  (new () => HouseInstance) &
  Associate = db.sequelize.define<HouseInstance>('Houses', {
  ...SequelizeAttributes.current.Houses,
})

House.associate = (models: any) => {
  House.belongsTo(models.Occupant,{
    foreignKey: 'occupant_id'
  })
  House.hasMany(models.Payment,{
    foreignKey: 'house_id'
  })
}

export default House
