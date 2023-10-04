/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from '@/dependencies/methods/_axios'
import { Setting } from '@/dependencies/types/setting'

const getGlobalSetting = async (key: string) => {
  return await api.get<Setting>(`/settings/${key}?isGlobal=true`)
}

const getSetting = async (key: string, query = '') => {
  return await api.get<Setting>(`/settings/${key}?${query}`)
}

const createSetting = async (data: Setting[]) => {
  return api.post('/settings', data)
}

const settingRepo = {
  getGlobalSetting,
  getSetting,
  createSetting,
}

export default settingRepo
