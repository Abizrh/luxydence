import { Model, Optional } from 'sequelize'
import { Associate } from 'types/sequelize'

import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface PaymentAttributes {
    id: number
    total: number
    status: string
    house_id: number
    occupant_id: number 
    total_paid: number  
    paid_at: string
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> { }

export interface PaymentInstance
    extends Model<PaymentAttributes, PaymentCreationAttributes>,
    PaymentAttributes { }

const Payment: typeof Model &
    (new () => PaymentInstance) &
    Associate = db.sequelize.define<PaymentInstance>('Payments', {
        ...SequelizeAttributes.current.Payments,
    })

Payment.associate = (models: any) => {
    Payment.belongsTo(models.House, {
        foreignKey: 'house_id'
    })
    Payment.belongsTo(models.Occupant, {
        foreignKey: 'occupant_id'
    })
}

export default Payment
