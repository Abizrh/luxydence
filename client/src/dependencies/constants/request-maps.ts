import { toKebabCase } from '../helpers/util-of-string'

type RequestMap = {
  [key: string]: {
    id: string
    path: string
    alias?: string
    method: string
    description?: string
  }
}

const requestRaws: any[] = [
  { path: 'auth/login', method: 'post', description: 'Api for login' },
  { path: 'auth/refresh', method: 'post', description: 'Api for refresh token' },
  { path: 'billing/first', method: 'get', description: 'Api for get billing information' },
  { path: 'dues', method: 'get,put', description: 'Api for get all dues' },
  { path: 'occupants', method: 'get,put', description: 'Api for get all occupants' },
  { path: 'houses', method: 'get,put', description: 'Api for get all houses' },
  { path: 'payments', method: 'get', description: 'Api for get all payments' },
  { path: 'payments/process', method: 'put', description: 'Api for processing payment' },
  { path: 'reports', method: 'get', description: 'Api for get reports' },
  { path: 'reports/daily/usage', method: 'get', description: 'Api for get reports daily usage' },
  { path: 'reports/weekly/usage', method: 'get', description: 'Api for get reports weekly usage' },
]
const requestMaps: RequestMap = {}

for (const item of requestRaws) {
  const key = toKebabCase(item.path)
  requestMaps[item.alias || key] = { id: key, path: item.path, method: item.method, description: item.description }
}

export { requestMaps }
