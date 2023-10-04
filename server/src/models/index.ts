import User from 'models/User'
import Due from 'models/Due'
import Occupant from 'models/Occupant'
import House from 'models/House'
import Payment from 'models/Payment'

const models = {
  User,
  Occupant,
  Due,
  House,
  Payment
}

export default models

export type MyModels = typeof models

Object.entries(models).map(([, model]) => {
  if (model?.associate) {
    model.associate(models)
  }
})
