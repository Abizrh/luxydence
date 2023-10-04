import i18next from 'i18next'
import { createInitLocales } from '../constants/locale-maps'
import { requestMaps } from '../constants/request-maps'
import { useFetchClient } from '../helpers/http-client'

export const initTranslate = async (lang = 'id') => {
  console.log('masuk method', lang)
  await i18next.init({
    lng: lang,
    debug: import.meta.env.VITE_DEBUG || false,
    resources: createInitLocales(),
  })
}

export const getTranslate = (key: string) => {
  return i18next.t(key)
}

export const getScreenType = (width: number) => {
  const widthObserver = Number(width)
  if (widthObserver < 639) return 'small'
  if (widthObserver >= 640 && widthObserver < 767) return 'medium'
  if (widthObserver >= 768 && widthObserver < 1023) return 'large'
  if (widthObserver >= 1024 && widthObserver < 1279) return 'extra'
  return 'extrabig'
}

export const createNotify = ($q: any, message: string, type: string, params: any = {}) => {
  if (!$q) return false
  let options: any = { progress: true, position: 'top', timeout: 2500 }
  if (type === 'error') {
    options = { ...options, icon: 'alert_circle_white', color: 'negative', textColor: 'white', message }
  } else if (type === 'success') {
    options = { ...options, icon: 'check_white', color: 'positive', textColor: 'white', message }
  }
  if (params?.position) {
    options.position = params.position
  }
  $q.notify(options)
}

export const createRequest: any = async (key: string, type: string = 'get', payloads: any = null, options: any = null) => {
  const currentPath = requestMaps[key]
  if (!currentPath) return { data: null }
  let pathUrl: any = currentPath?.path || ''
  let result = null
  if (options && options.sub_path) {
    // addition subpath by id
    pathUrl += '/' + options.sub_path
    delete options.sub_path
  }
  const settings = options || {}
  const fetchClient = useFetchClient(settings)
  if (type === 'get') {
    if (payloads) pathUrl = pathUrl + '?' + (typeof payloads === 'object' ? new URLSearchParams(payloads).toString() : payloads.toString())
    result = await fetchClient(pathUrl, { refetch: true }).json()
  } else if (type === 'post') {
    result = await fetchClient(pathUrl).post(payloads).json()
  } else if (type === 'patch') {
    result = await fetchClient(pathUrl).patch(payloads).json()
  } else if (type === 'put') {
    result = await fetchClient(pathUrl).put(payloads).json()
  } else if (type === 'delete') {
    result = await fetchClient(pathUrl).delete(payloads).json()
  }
  return result
}
