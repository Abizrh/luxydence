/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import api from '@/dependencies/methods/_axios'
import { Due } from '@/dependencies/types/due'

const getDue = async () => {
  return await api.get<Due>(`/dues`)
}
const getDueDetail = async (key: string, query = '') => {
  return await api.get<Due>(`/dues/${key}?${query}`)
}
const deleteDue = async (key: string, query = '') => {
  return await api.get<Due>(`/dues/${key}?${query}`)
}
const createDue = async (data: Due[]) => {
  return api.post('/dues', data)
}
const updateDue = async (data: Due[]) => {
  return api.put('/dues', data)
}

const dueRepo = {
  getDue,
  createDue,
  updateDue,
  getDueDetail,
  deleteDue
}

export default dueRepo
