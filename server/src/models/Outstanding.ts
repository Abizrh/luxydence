import { Model, Optional } from 'sequelize'
import { Associate } from 'types/sequelize'

import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface OutstandingAttributes {
    id: number
    total_amount: number
    payment_id: number
    is_paid: boolean
    date: string
    description: string
}

interface OutstandingCreationAttributes extends Optional<OutstandingAttributes, 'id'> { }

export interface OutstandingInstance
    extends Model<OutstandingAttributes, OutstandingCreationAttributes>,
    OutstandingAttributes { }

const Outstanding: typeof Model &
    (new () => OutstandingInstance) &
    Associate = db.sequelize.define<OutstandingInstance>('Outstandings', {
        ...SequelizeAttributes.current.Outstandings,
    })

Outstanding.associate = (models: any) => {
    Outstanding.belongsTo(models.Payment, {
        foreignKey: 'payment_id'
    })
}

export default Outstanding
