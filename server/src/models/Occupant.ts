import { Model, Optional } from 'sequelize'
import { Associate } from 'types/sequelize'

import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface OccupantAttributes {
    id: number
    responsible: string 
    families: string
}

interface OccupantCreationAttributes extends Optional<OccupantAttributes, 'id'> { }

export interface OccupantInstance
    extends Model<OccupantAttributes, OccupantCreationAttributes>,
    OccupantAttributes { }

const Occupant: typeof Model &
    (new () => OccupantInstance) &
    Associate = db.sequelize.define<OccupantInstance>('Occupants', {
        ...SequelizeAttributes.current.Occupants,
    })

Occupant.associate = (models: any) => { 
    Occupant.hasOne(models.House, {
        foreignKey: 'occupant_id'
    })
    Occupant.hasMany(models.Payment, {
        foreignKey: 'occupant_id'
    })
 }

export default Occupant
