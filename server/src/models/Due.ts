import { Model, Optional } from 'sequelize'
import { Associate } from 'types/sequelize'

import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface DueAttributes {
    id: number
    total: number
    type: string,
    description: string,
}

interface DueCreationAttributes extends Optional<DueAttributes, 'id'> { }

export interface DueInstance
    extends Model<DueAttributes, DueCreationAttributes>,
    DueAttributes { }

const Due: typeof Model &
    (new () => DueInstance) &
    Associate = db.sequelize.define<DueInstance>('Dues', {
        ...SequelizeAttributes.current.Dues,
    })

Due.associate = (models: any) => { }

export default Due
