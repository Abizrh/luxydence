import { api } from '@/dependencies/methods/_axios'
import { Billing } from '@/dependencies/types/billing'

const create = async (data: Billing[]) => {
  return api.post('/billing', data)
}

const getSnapToken = async () => {
  return api.post('/billing/snap-token')
}

const getBillings = async (limit = 10) => {
  return api.get<{ data: Billing[]; meta: object }>('/billing/history?perpage=' + limit)
}

const getBillingById = async (id: string) => {
  return api.get(`/billing/${id}`)
}

const getTaxById = async (id: string) => {
  return api.get(`/billing/${id}/tax-billing-id`)
}

const billingRepo = {
  create,
  getSnapToken,
  getBillings,
  getBillingById,
  getTaxById,
}

export default billingRepo
