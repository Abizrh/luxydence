import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile-user'
import { useSettingStore } from '@/stores/setting'
import { differenceOfTwoDate } from '../helpers/util-of-timer'
import { createRequest } from './_method'

/**
 * Decode Jwt Token with Window atob
 * @param jwtToken a token from jwt
 * @returns a object
 */
export const getDecodeToken = (jwtToken: string) => {
  if (!jwtToken || jwtToken?.trim()?.length === 0 || typeof window === 'undefined') return null
  const jwtArrays = jwtToken.split('.')
  const jwtPayloads: any = jwtArrays.length > 1 ? jwtArrays[1] : null
  try {
    const parsedToken = JSON.parse(window.atob(jwtPayloads))
    return parsedToken
  } catch (_error) {
    return null
  }
}

/**
 * Calculate Jwt Token Expired time
 * @param jwtToken a token from jwt
 * @returns a object
 */
export const getExpiredToken = (parsedToken: any) => {
  if (!parsedToken) return null
  const iatTime = (parsedToken?.iat || 0) * 1000
  const expTime = (parsedToken?.exp || 0) * 1000
  const resultDuration = differenceOfTwoDate(iatTime, expTime, 'minute')
  const resultCurrent = differenceOfTwoDate(new Date().getTime(), expTime, 'minute')
  if (resultCurrent > 0 && resultCurrent < resultDuration) {
    return { expired: false, ...parsedToken }
  } else {
    return { expired: true }
  }
}

/**
 * Action Login Function
 * @param payloads { email, password }
 */
export const doLogin = async (payloads: any) => {
  const authStore = useAuthStore()
  const { statusCode, error, data }: any = await createRequest('auth-login', 'post', payloads)
  return partLogin({ authStore }, statusCode, error, data)
}

/**
 * Action Logout Function
 */
export const doLogout = () => {
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const settingStore = useSettingStore()
  authStore.setToken(null)
  profileStore.clearAll()
  settingStore.setForbidden(false)
}

/**
 * Action Refresh Token Function
 */
export const doRefresh = async () => {
  const authStore = useAuthStore()
  const settingStore = useSettingStore()
  const isForbidden = settingStore.isForbidden || false
  if (!isForbidden) return false
  const jwtToken = authStore.getToken || null
  const isCredential = true
  const options = isCredential
    ? {
        headers: { 'Access-Control-Allow-Origin': '*' },
        settings: { credentials: 'include' },
      }
    : {
        headers: typeof document !== 'undefined' ? { Cookie: document.cookie || `refreshToken=${jwtToken}` } : null,
        settings: { credentials: 'omit' },
      }
  const { statusCode, error, data }: any = await createRequest('auth-refresh', 'post', null, options)
  return partLogin({ authStore, settingStore }, statusCode, error, data)
}

/**
 * Action Part Login / Refresh
 * @param statusCode, @param error, @param data
 */
const partLogin = (stores: any, statusCode: any, error: any, data: any) => {
  const authStore = stores?.authStore || null
  const settingStore = stores?.settingStore || null
  if (settingStore) settingStore.setForbidden(false)
  if (statusCode.value === 201) {
    const parsedData: any = data.value.data || null
    const token = parsedData?.token || null
    if (authStore) authStore.setToken(token)
    return { response: data.value, isSuccess: true }
  } else {
    return { response: error.value?.message, isSuccess: false }
  }
}
